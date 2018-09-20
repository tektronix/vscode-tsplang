#!/usr/bin/env bash

differ() {
    # USAGE: differ dirA dirB dirOutput

    for f in "${1}"/*.htm; do
        local filename name
        filename="$(basename "$f")"
        name="${filename//.htm/}"
        local file_b="${2}"/"$filename"

        if [ -f "$file_b" ]; then
            local diffcontent

            diffcontent="$(diff "$f" "$file_b")"

            if [ -n "$diffcontent" ]; then
                local headername
                headername="$(grep '^<h2' "$f" | grep -oP '(?<=\>).*(?=\<)' -)" || return
                echo "$diffcontent" >> "${3}"/"$headername"-"$name".diff || return
            fi
        fi
    done
}

differ "$@"
