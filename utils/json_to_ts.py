#!/bin/env python3

import json
from typing import List

class ParameterInformation(dict):
    template = (
        "        ParameterInformation.create(\n"
        "            '{name}',\n"
        "            '{details}.'\n"
        "        ),")

    def __init__(self, pair: dict):
        has_name: bool = 'name' not in pair.keys()
        has_details: bool = 'details' not in pair.keys()
        if has_name or has_details:
            err_msg: str = 'Cannot find matching `{}` key'
            if has_name:
                raise KeyError(err_msg.format('details'))
            else:
                raise KeyError(err_msg.format('name'))
            del err_msg
        del has_name, has_details
        super().__init__(pair)

    @property
    def name(self) -> str:
        return super().get('name')

    @property
    def details(self) -> str:
        return super().get('details').replace("'", "\\'")

    def stringify(self) -> str:
        if self.name is None or self.details is None:
            return ''
        return ParameterInformation.template.format(
            name=self.name, details=self.details)

class SignatureInformation(object):
    template = (
        "\n"
        "    SignatureInformation.create(\n"
        "        '{cmdname}({paramnames})',\n"
        "        undefined,\n"
        "{paraminfos}\n"
        "    ),")

    def __init__(self, name: str, params: List[dict]):
        self.cmdname: str = name
        self.params: List[ParameterInformation] = [
            ParameterInformation(p) for p in params]

    def stringify(self) -> str:
        content: str = SignatureInformation.template.format(
            cmdname=self.cmdname, paramnames='{paramnames}',
            paraminfos='{paraminfos}')
        names: str = ''
        infos: str = ''
        for p in self.params:
            ## add trailing characters to each item
            names += '{}, '.format(p.name)
            infos += '{}\n'.format(p.stringify())
        ## right strip trailing characters
        names = names.rstrip(', ')
        infos = infos.rstrip('\n')
        content = content.format(paramnames=names, paraminfos=infos)
        content = content.rstrip('\\n \n')
        return content

class CompletionItem(object):
    template = (
        "\n"
        "    `LCB`\n"
        "        detail: '{hint}',\n"
        "        documentation: `LCB`\n"
        "            kind: MarkupKind.Markdown,\n"
        "            value: '{details}'\n"
        "        `RCB`,\n"
        "        kind: CompletionItemKind.{kind},\n"
        "        label: '{label}',\n"
        "    `RCB`,")

    def __init__(
            self, name: str, hint: str, type_: str, details: str):
        self.label: str = name
        self.hint: str = hint.replace("'", "\\'")
        self.kind: str = type_
        self.details: str = details.replace("'", "\\'")

    @property
    def kind(self) -> str:
        return self._kind
    @kind.setter
    def kind(self, value: str):
        if 'Attribute' in value:
            if 'W' not in value:
                self._kind: str = 'Constant'
            else:
                self._kind: str = 'Property'
        elif 'Constant' in value:
            self._kind: str = 'Constant'
        elif 'Function' in value:
            self._kind: str = 'Function'
        else:
            raise ValueError('Unknown type `{}`'.format(value))

    def stringify(self) -> str:
        return CompletionItem.template.format(
            hint=self.hint, details=self.details, kind=self.kind,
            label=self.label)

class TypeScriptFile(object):
    template = (
        "/* tslint:disable:max-line-length */\n"
        "'use strict'\n"
        "\n"
        "import `LCB` CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation `RCB` from 'vscode-languageserver'\n"
        "\n"
        "const {base}Completions: Array<CompletionItem> = [{citem}\n"
        "]\n"
        "\n"
        "const {base}Signatures: Array<SignatureInformation> = [{sitem}\n"
        "]\n"
        "\n"
        "export async function get{upperCaseBase}Completions(): Promise<Array<CompletionItem>> `LCB`\n"
        "    return new Promise<Array<CompletionItem>>((\n"
        "        resolve: (value?: Array<CompletionItem>) => void,\n"
        "        reject: (reason?: Error) => void\n"
        "    ): void => `LCB`\n"
        "            try `LCB`\n"
        "                resolve({base}Completions)\n"
        "            `RCB`\n"
        "            catch (e) `LCB`\n"
        "                reject(new Error(e.toString()))\n"
        "            `RCB`\n"
        "    `RCB`)\n"
        "`RCB`\n"
        "\n"
        "export async function get{upperCaseBase}Signatures(): Promise<Array<SignatureInformation>> `LCB`\n"
        "    return new Promise<Array<SignatureInformation>>((\n"
        "        resolve: (value?: Array<SignatureInformation>) => void,\n"
        "        reject: (reason?: Error) => void\n"
        "    ): void => `LCB`\n"
        "        try `LCB`\n"
        "            resolve({base}Signatures)\n"
        "        `RCB`\n"
        "        catch (e) `LCB`\n"
        "            reject(new Error(e.toString()))\n"
        "        `RCB`\n"
        "    `RCB`)\n"
        "`RCB`\n")

    def __init__(
            self, base: str, citems: List[CompletionItem],
            sitems: List[SignatureInformation]):
        self.base: str = base
        self.citems: List[CompletionItem] = citems
        self.sitems: List[SignatureInformation] = sitems

    def stringify(self) -> str:
        content: str = TypeScriptFile.template.format(
            base=self.base, citem='{citem}', sitem='{sitem}', upperCaseBase=capitalize(self.base))
        for c in self.citems:
            replacement = '{}{}'.format(c.stringify(), '{citem}')
            content = content.format(citem=replacement, sitem='{sitem}')
        content = content.format(citem='', sitem='{sitem}')
        if (len(self.sitems) is 0):
            content = content.replace('[{sitem}\n]', 'new Array()')
        else:
            for s in self.sitems:
                replacement = '{}{}'.format(s.stringify(), '{sitem}')
                content = content.format(sitem=replacement)
            content = content.format(sitem='')
        content = content.replace('`LCB`', '{')
        content = content.replace('`RCB`', '}')
        return content

class Context(object):
    def __init__(self):
        self.base: str = ''
        self.citems: List[CompletionItem] = []
        self.sitems: List[SignatureInformation] = []

    def update(self, new_base: str):
        self.base = new_base
        self.citems.clear()
        self.sitems.clear()

def capitalize(value: str) -> str:
    if (len(value) is 0):
        return value
    elif (len(value) is 1):
        return value.upper()

    split_array: List[str] = [value[0], value[1:]]
    split_array[0] = split_array[0].upper()

    return ''.join(split_array)

def writefile(context: Context, destpath: str, force: bool) -> bool:
    file_and_ext = '{}.ts'.format(context.base)
    out_filepath = os.path.join(destpath, file_and_ext)
    del file_and_ext

    if not ARGS.force:
        if os.path.isfile(out_filepath):
            print('SKIPPED {}'.format(out_filepath))
            context.update(this_base)
            return False

    content = TypeScriptFile(context.base, context.citems, context.sitems).stringify()
    content = content.replace('`LF`', '\\n')
    with open(out_filepath, encoding='utf-8', mode='w', newline='\n') as out:
        out.write(content)
    del content
    del out

    print(' WROTE  {}'.format(out_filepath))

    return True

if __name__ == '__main__':
    import argparse
    import os
    from sys import argv

    PARSER = argparse.ArgumentParser(
        description='Convert JSON help files to TypeScript.',
        formatter_class=argparse.RawDescriptionHelpFormatter)
    # force overwrite
    PARSER.add_argument(
        '-f',
        '--force',
        action='store_true',
        default=False,
        help='overwrite existing files',
        required=False)
    # source directory
    PARSER.add_argument(
        'source',
        help='directory containing raw JSON help files',
        nargs=1)
    # destination directory
    PARSER.add_argument(
        'destination',
        help='TypeScript file output directory',
        nargs=1)

    ARGS = PARSER.parse_args(argv[1:])

    ABSSRC = os.path.abspath(ARGS.source[0])
    ABSDEST = os.path.abspath(ARGS.destination[0])

    os.makedirs(ABSDEST, exist_ok=True)

    for here, _, files in os.walk(ABSSRC):
        if here is not ABSSRC:
            continue
        context: Context = Context()
        for f in files:
            json_obj: dict = {}
            with open(os.path.join(here, f), encoding='utf-8', mode='r', newline='\n') as in_:
                json_obj = json.load(in_)
            del in_

            this_base: str = json_obj['name'].split('.', maxsplit=1)[0]
            this_base = this_base.replace('[N]', '')
            this_base = this_base.replace('[1]', '')

            ## call update on the first iteration
            if len(context.base) is 0:
                context.update(this_base)

            ## base command has changed: output and reset
            if this_base != context.base:
                writefile(context, ABSDEST, ARGS.force)

                context.update(this_base)

            ## base is the same: add this json object to the current context
            citem = CompletionItem(
                json_obj['name'], json_obj['hint'], json_obj['type'],
                json_obj['details'])
            context.citems.append(citem)
            del citem
            if json_obj['type'] == "Function":
                if len(json_obj['arguments']) is not 0:
                    sitem = SignatureInformation(
                        json_obj['name'], json_obj['arguments'])
                    context.sitems.append(sitem)
                    del sitem
    writefile(context, ABSDEST, ARGS.force)
