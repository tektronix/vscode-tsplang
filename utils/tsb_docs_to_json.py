#!/bin/env python3

# TODO: Grab arguments from beginning of usage and check for those when
#+      populating the arguments list.  Currently we're blindly grabbing
#+      items if the tag structure loosely matches.

## beeper.beep()     2450/29636.htm
# class=heading2-icl    beeper.beep()
# class=bodyzero        This function generates an audible tone.
# class=tableintopic
#   Type                    class=tablebodytextsmall    Function
#   TSP-Link accessible     class=tablebodytextsmall    Yes
#   Affected by             class=tablebodytextsmall    &nbsp;
#   Where saved             class=tablebodytextsmall    &nbsp;
#   Default value           class=tablebodytextsmall    &nbsp;
# class=tableintopic
#   class=codetable         duration
#   class=tablebodytext     The amount of time to play the tone (0.001 to 100&nbsp;s)
#   class=codetable         frequency
#   class=tablebodytext     The frequency of the beep (20 to 8000 Hz)
# class=iclbody         You can use the beeper of the instrument to provide an audible signal at a specific frequency and time duration. For example, you can use the beeper to signal the end of a lengthy sweep.
# class=iclbody         Using this function from a remote interface does not affect audible errors or key click settings that were made from the Model 2450 front panel.
# class=jumptemplate

## CompletionItem
# {
#       label:  'beeper.beep',
#       kind:   CompletionItemKind.X,
#       detail: 'Generate an audible tone.',
#       documentation:  new MarkdownString(),
# }

import json
from bs4 import BeautifulSoup, NavigableString, Tag
from typing import List

class Argument(object):
    def __init__(self, name = None, details = None):
        self._details = Argument._set_coerce(details)
        self.name = name

    @property
    def details(self) -> str:
        return self._details
    @details.setter
    def details(self, value: str):
        self._details = Argument._set_coerce(value)

    @staticmethod
    def _set_coerce(value: str) -> str:
        new = value.strip().replace('\xa0', '')
        return new

class JsonDoc(Argument):
    def __init__(self):
        self._affected_by: str = ''
        self.also: List[str] = []
        self.arguments: List[Argument] = []
        self._default: str = ''
        self._details: str = ''
        self._hint: str = ''
        self.name: str = ''
        self.source: str = ''
        self._tsplink: str = ''
        self._type: str = ''
        self._where_saved: str = ''

    @property
    def affected_by(self) -> str:
        return self._affected_by
    @affected_by.setter
    def affected_by(self, value: str):
        self._affected_by = JsonDoc._set_coerce(value)

    @property
    def default(self) -> str:
        return self._default
    @default.setter
    def default(self, value: str):
        self._default = JsonDoc._set_coerce(value)

    @property
    def details(self) -> str:
        return self._details
    @details.setter
    def details(self, value: str):
        self._details = JsonDoc._set_coerce(value)

    @property
    def hint(self) -> str:
        return self._hint
    @hint.setter
    def hint(self, value: str):
        self._hint = JsonDoc._set_coerce(value)

    @property
    def tsplink(self) -> str:
        return self._tsplink
    @tsplink.setter
    def tsplink(self, value: str):
        self._tsplink = JsonDoc._set_coerce(value)

    @property
    def type_(self) -> str:
        return self._type
    @type_.setter
    def type_(self, value: str):
        self._type = JsonDoc._set_coerce(value)

    @property
    def where_saved(self) -> str:
        return self._where_saved
    @where_saved.setter
    def where_saved(self, value: str):
        self._where_saved = JsonDoc._set_coerce(value)

class JsonDocEncoder(json.JSONEncoder):
    # pylint: disable=E0202
    def default(self, o: JsonDoc):
        return {
            'affected_by': o.affected_by,
            'also_see': [a for a in o.also],
            'arguments': [{'name':a.name, 'details':a.details} for a in o.arguments],
            'default': o.default,
            'details': o.details,
            'hint': o.hint,
            'name': o.name,
            'source': o.source,
            'tsplink': o.tsplink,
            'type': o.type_,
            'where_saved': o.where_saved,
        }

def drop_newline_elements(contents: list) -> list:
    output: list = []
    for c in contents:
        if type(c) is NavigableString:
            if str(c).strip() is not '':
                output.append(c)
        else:
            output.append(c)
    return output

def extract_content(element: Tag) -> str:
    output: str = ''
    for c in element.contents:
        if '<br/>' in str(c) or str(c) == '\n':
            output += '`LF`'
        else:
            if type(c) is Tag:
                if c.name == 'ul':
                    for li in c.find_all('li'):
                        output += li.text
                        output += '`LF`'
                    continue
                output += extract_content(c)
            else:
                output += c.replace('\xa0', '')
    return output

def get_soup(filepath: str) -> BeautifulSoup:
    soup: BeautifulSoup = None
    with open(filepath, encoding='utf-8', mode='r', newline='\n') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    return soup

if __name__ == '__main__':
    import argparse
    import os
    from sys import argv

    PARSER = argparse.ArgumentParser(
        description='Convert TSB *.htm help files to JSON.',
        formatter_class=argparse.RawDescriptionHelpFormatter)
    # force overwrite
    PARSER.add_argument(
        '-f',
        '--force',
        action='store_true',
        default=False,
        help='overwrite existing files',
        required=False)
    # remove non-matches
    PARSER.add_argument(
        '-r',
        '--remove',
        action='store_true',
        default=False,
        help='delete unnecessary source files',
        required=False)
    # source directory
    PARSER.add_argument(
        'source',
        help='directory containing raw TSB help files',
        nargs=1)
    # destination directory
    PARSER.add_argument(
        'destination',
        help='JSON file output directory',
        nargs=1)

    ARGS = PARSER.parse_args(argv[1:])

    ABSSRC = os.path.abspath(ARGS.source[0])
    ABSDEST = os.path.abspath(ARGS.destination[0])

    os.makedirs(ABSDEST, exist_ok=True)

    for here, _, files in os.walk(ABSSRC):
        if here is not ABSSRC:
            continue
        for f in files:
            if '.htm' in f and '.html' not in f:
                print('{}: '.format(f), end='')
                filepath = os.path.join(here, f)
                soup = get_soup(filepath)
                cmd_name_object = soup.find(attrs={'class': 'heading2-icl'})
                if cmd_name_object is not None:
                    cmd: JsonDoc = JsonDoc()

                    cmd.name = cmd_name_object.text.strip('() ')
                    del cmd_name_object

                    file_and_ext = '{}.json'.format(cmd.name)
                    out_filepath = os.path.join(ABSDEST, file_and_ext)
                    del file_and_ext

                    if not ARGS.force:
                        if os.path.isfile(out_filepath):
                            print('SKIPPED {}'.format(out_filepath), flush=True)
                            continue

                    cmd.hint = soup.find(attrs={'class': 'bodyzero'}).text

                    tables = soup.find_all(attrs={'class': 'tableintopic'})

                    attributes = tables[0].find_all(attrs={'class': 'tablebodytextsmall'})
                    cmd.type_ = extract_content(attributes[0])
                    cmd.tsplink = extract_content(attributes[1])
                    cmd.affected_by = extract_content(attributes[2])
                    cmd.where_saved = extract_content(attributes[3])
                    cmd.default = extract_content(attributes[4])

                    if len(tables) > 1:
                        arg_names = tables[1].find_all(attrs={'class': 'monospaceitalic'})
                        for n in arg_names:
                            arg_detail: list = n.parent.parent.parent.contents
                            arg_detail.reverse()
                            arg_detail = drop_newline_elements(arg_detail)
                            detail: str = extract_content(arg_detail[0])
                            if detail.endswith('`LF`'):
                                detail = detail.rsplit('`LF`', maxsplit=1)[0]
                            name: str = extract_content(n)
                            cmd.arguments.append(Argument(name=name, details=detail))
                            del arg_detail, detail, name
                        del arg_names

                    for d in soup.find_all(attrs={'class': 'iclbody'}):
                        if cmd.details is not '':
                            cmd.details += '`LF``LF`'
                        cmd.details += extract_content(d)

                    cmd.also = []
                    for a in soup.find_all(attrs={'class': 'jumptemplate'}):
                        cmd.also.append(a.text)

                    path, infile = os.path.split(os.path.join(here, f))
                    basedir = os.path.basename(path)
                    cmd.source = os.path.join(basedir, infile)
                    del infile, path, basedir

                    content = json.dumps(cmd, cls=JsonDocEncoder, sort_keys=True, indent=4)
                    with open(out_filepath, encoding='utf-8', mode='w', newline='\n') as out:
                        out.write(content)
                    del content
                    del out

                    print('WROTE {}'.format(out_filepath), flush=True)

                else:
                    if ARGS.remove:
                        os.remove(filepath)
                        print('DELETED {}'.format(filepath), flush=True)
                    else:
                        print(flush=True)

                del filepath
