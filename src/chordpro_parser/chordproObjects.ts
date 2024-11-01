export class Line {
  lyricChord: LyricChord[]

  constructor(lyricChord: LyricChord[]) {
    this.lyricChord = lyricChord
  }
}

export class LyricChord {
  lyric: string
  chord: string

  constructor(lyric: string, chord: string = '') {
    this.lyric = lyric
    this.chord = chord
  }
}

export class Tag {
  tag: string
  content: string

  constructor(tag: string, content: string) {
    this.tag = tag
    this.content = content
  }
}

export class PartOpenTag {
  name: 'Chorus' | 'Verse'
  constructor(tag: string) {
    if (tag === 'soc') {
      this.name = 'Chorus'
    } else {
      this.name = 'Verse'
    }
  }
}

export class PartCloseTag {}

export class Song {
  title: string = ''
  artist: string = ''
  tags: Tag[]
  parts: Part[]

  constructor(tags: Tag[], parts: Part[]) {
    this.tags = tags
    this.parts = parts
    this.tags.forEach((tag) => {
      if (tag.tag === 'title') this.title = tag.content
      if (tag.tag === 'artist') this.artist = tag.content
    })
  }
}

export class Part {
  name: string
  lines: Line[]

  constructor(name: string, lines: Line[]) {
    this.name = name
    this.lines = lines
  }
}
