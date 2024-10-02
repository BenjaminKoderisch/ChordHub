import {parseLine} from './lineParser'
import {Tag, Line, Song, Part, PartOpenTag, PartCloseTag} from './chordproObjects'

export function parseSong(file: string) {
    let content = file.split('\n')
    content.pop()

    let tags: Tag[] = []
    let lines: Line[] = []
    let result: Line | Tag | null | PartOpenTag | PartCloseTag
    let parts: Part[] = []
    let newPartName: string = ""

    for(let line of content){
        result = parseLine(line) 
        if (result instanceof PartOpenTag) {
            if(lines.length > 0){
                parts.push(new Part(newPartName, lines))
                lines = []
            }
            newPartName = result.name
        } else {
            if(result instanceof Tag)
                   tags.push(result)
        }
        if(result instanceof Line) {
            if(parts.length !== 0 || lines.length !== 0 || result.lyrics !== "")
                lines.push(result)
        }
    }
    if(lines.length > 0)
        parts.push(new Part(newPartName, lines))

    return new Song(tags, parts)
}

