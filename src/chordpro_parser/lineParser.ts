import { Line, LyricChord, Tag, PartOpenTag, PartCloseTag } from './chordproObjects'

const CHORD_OPEN = '['
const CHORD_CLOSE = ']'

const TAG_OPEN = '{'
const TAG_CLOSE = '}'
const TAG_SEPERATOR = ':'
const COMMENT = 'c'

const NOT_FOUND = -1

const PART_OPEN = ['soc', 'sov']
const PART_CLOSE = ['eoc', 'eov']

function parseChordLine(line: string): Line {
  let lyricChords: LyricChord[] = []

  while (line.length > 0) {
    let firstTag = line.indexOf(CHORD_OPEN)
    let secondTag = line.indexOf(CHORD_CLOSE)
    let nextWhitespace = line.indexOf(' ')

    if (firstTag > 0) {
      let lyric = line.substring(0, firstTag)
      lyricChords.push(new LyricChord(lyric, ''))
      line = line.replace(lyric, '')
    } else if (firstTag !== -1 && secondTag !== -1) {
      let chord = line.substring(firstTag + 1, secondTag)
      let lyric = ''
      if (nextWhitespace !== -1) {
        lyric = line.substring(secondTag + 1, nextWhitespace)
      } else {
        lyric = line.substring(secondTag + 1)
      }
      line = line.replace(CHORD_OPEN + chord + CHORD_CLOSE + lyric, '')
      lyricChords.push(new LyricChord(lyric, chord))
    } else {
      lyricChords.push(new LyricChord(line, ''))
      line = ''
    }
  }

  return new Line(lyricChords)
}

function parseTagLine(line: string): Tag | PartOpenTag | PartCloseTag {
  let firstTagPos = line.indexOf(TAG_OPEN)
  let secondTagPos = line.indexOf(TAG_CLOSE)
  let seperatorPos = line.indexOf(TAG_SEPERATOR)

  if (seperatorPos === NOT_FOUND) {
    let tag = line.substring(firstTagPos + 1, secondTagPos)
    if (PART_OPEN.includes(tag)) {
      return new PartOpenTag(tag)
    }
    if (PART_CLOSE.includes(tag)) {
      return new PartCloseTag()
    }
  }

  let tag = line.substring(firstTagPos + 1, seperatorPos).trim()
  let content = line.substring(seperatorPos + 1, secondTagPos).trim()

  if (tag === COMMENT) {
    return new PartOpenTag(content)
  }
  return new Tag(tag, content)
}

export function parseLine(line: string): Tag | Line | PartOpenTag | PartCloseTag | null {
  if (line.includes(TAG_OPEN)) return parseTagLine(line)
  if (line.startsWith('#')) return null
  return parseChordLine(line)
}
