import {Line, Chord, Tag, PartOpenTag, PartCloseTag} from "./chordproObjects"

const CHORD_OPEN = '['
const CHORD_CLOSE = ']'

const TAG_OPEN = '{'
const TAG_CLOSE = '}'
const TAG_SEPERATOR = ':'
const COMMENT = 'c'

const NOT_FOUND = -1

const PART_OPEN = ['soc', 'sov']
const PART_CLOSE = ['eoc', 'eov']

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
    let firstTagPos = line.indexOf(TAG_OPEN)
    let secondTagPos = line.indexOf(TAG_CLOSE)
    let seperatorPos = line.indexOf(TAG_SEPERATOR)

    if (seperatorPos === NOT_FOUND) {
        let tag = line.substring(firstTagPos+1, secondTagPos)
        if (PART_OPEN.includes(tag)){
            return new PartOpenTag(tag)
        }
        if (PART_CLOSE.includes(tag)) {
            return new PartCloseTag()
        }   
    }


    let tag = line.substring(firstTagPos+1, seperatorPos).trim()
    let content = line.substring(seperatorPos+1, secondTagPos).trim()

    if (tag === COMMENT) {
        return new PartOpenTag(content)
    }
    return new Tag(tag, content) 
}

export function parseLine(line: string): Tag | Line | PartOpenTag | PartCloseTag | null {
    if(line.includes(TAG_OPEN))
        return parseTagLine(line)
    if(line.startsWith("#"))
       return null
    return parseChordLine(line)
}

