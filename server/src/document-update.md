
IF CHANGE ARRAY LENGTH IS 1 AND rangeLength IS 0:
    get the leading trivia position of the narrowest edited statement context
    adjust the ending trivia position of the edited statement context by the delta defined in the update event
    get the substring defined by the new range
    insert the new statements at the index of the changed statement

ELSE:
    (get the position of the topmost line of the statement that contains a change
        reparse the rest of the file from that position)
    (drop all nodes in the AST following that topmost edited statement)
    (concatenate new AST onto the end of the old AST)

    for each change
        n = node at the change position from the AST
        RECURSE:
        for p in n.parent
            if the type of p is Chunk AND p.parent === null
                return n.position
            else:
                n = p
                goto RECURSE
