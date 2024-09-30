import {Line, Chord, Tag, PartOpenTag, PartCloseTag} from "./chordproObjects"

const CHORD_OPEN = '['
const CHORD_CLOSE = ']'

const TAG_OPEN = '{'
const TAG_CLOSE = '}'
const TAG_SEPERATOR = ':'

const NOT_FOUND = -1

const PART_OPEN = ['{soc}', '{sov}']
const PART_CLOSE = ['{eoc}', '{eov}']

function parseChordLine(line: string): Line{
    let chords: Chord[] = []
    while(line.includes(CHORD_OPEN)) {
        let firstTag = line.indexOf(CHORD_OPEN)
        let secondTag = line.indexOf(CHORD_CLOSE)
        
        let chord = line.substring(firstTag+1, secondTag)
        line = line.replace(CHORD_OPEN+chord+CHORD_CLOSE, "")

        chords.push(new Chord(firstTag, chord))
    }

    return new Line(line, chords) 
}

function parseTagLine(line: string): Tag | PartOpenTag | PartCloseTag {
    let firstTag = line.indexOf(TAG_OPEN)
    let secondTag = line.indexOf(TAG_CLOSE)
    let seperator = line.indexOf(TAG_SEPERATOR)

    if (seperator === NOT_FOUND) {
        let tag = line.substring(firstTag+1, secondTag)
        if (PART_OPEN.includes(tag)){
            return new PartOpenTag(tag)
        }
        if (PART_CLOSE.includes(tag)) {
            return new PartCloseTag()
        }   
    }   

    let tag = line.substring(firstTag+1, seperator).trim()
    let content = line.substring(seperator+1, secondTag).trim()

    return new Tag(tag, content) 
}

export function parseLine(line: string): Tag | Line | PartOpenTag | PartCloseTag | null {
    if(line.includes(TAG_OPEN))
        return parseTagLine(line)
    if(line.startsWith("#"))
       return null
    return parseChordLine(line)
}

