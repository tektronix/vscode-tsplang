#!/usr/bin/env bash

cmdset_differ() {
    # USAGE: cmdset_differ dirA dirB file

    local -a dir_a_cmds=( )
    local -a dir_b_cmds=( )

    local -a dir_a_has=( )
    local -a dir_b_has=( )

    ## load dirA command names
    for f in "${1}"/*.htm; do
        local headername
        headername="$(grep '^<h2' "$f" | grep -oP '(?<=\>).*(?=\<)' -)" || return
        dir_a_cmds[${#dir_a_cmds[@]}]="$headername"
    done

    ## load dirB command names
    for f in "${2}"/*.htm; do
        local headername
        headername="$(grep '^<h2' "$f" | grep -oP '(?<=\>).*(?=\<)' -)" || return
        dir_b_cmds[${#dir_b_cmds[@]}]="$headername"
    done

    ## O(n^2) array search!
    for cmdA in "${dir_a_cmds[@]}"; do
        local -i match=0

        for cmdB in "${dir_b_cmds[@]}"; do
            if [[ "$cmdA" == "$cmdB" ]]; then
                match=1
                break
            fi
        done

        if [ "$match" -eq 0 ]; then
            dir_a_has[${#dir_a_has[@]}]="$cmdA"
        fi
    done

    ## O(n^2) array search (again)!
    for cmdB in "${dir_b_cmds[@]}"; do
        local -i match=0

        for cmdA in "${dir_a_cmds[@]}"; do
            if [[ "$cmdB" == "$cmdA" ]]; then
                match=1
                break
            fi
        done

        if [ "$match" -eq 0 ]; then
            dir_b_has[${#dir_b_has[@]}]="$cmdB"
        fi
    done

    if [[ "${#dir_a_has[@]}" -eq 0 && "${#dir_b_has[@]}" -eq 0 ]]; then
        echo 'No differences!'
        return
    fi

    ## output to file
    echo "${1}" > "${3}" || return
    for aHas in "${dir_a_has[@]}"; do
        echo "$aHas" >> "${3}" || return
    done

    echo -e "\n${2}" >> "${3}" || return
    for bHas in "${dir_b_has[@]}"; do
        echo "$bHas" >> "${3}" || return
    done
}

cmdset_differ "$@"
