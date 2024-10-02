export class Line{
    lyrics: string
    chords: Chord[]

    constructor(lyrics: string, chords: Chord[]){
        this.lyrics = lyrics
        this.chords = chords
    }
}

export class Chord{
    position: number
    chord: string

    constructor(position: number, chord: string){
        this.position = position
        this.chord = chord
    }
}

export class Tag{
    tag: string
    content: string

    constructor(tag: string, content: string) {
        this.tag = tag
        this.content = content
    }
}

export class PartOpenTag {
    name: 'Chorus' | 'Verse'
    constructor(tag: string){
        if(tag === 'soc') {
            this.name = 'Chorus'
        } else {
            this.name = 'Verse'
        }
    }
}

export class PartCloseTag {}

export class Song{
    title: string = ""
    artist: string = ""
    tags: Tag[]
    parts: Part[]

    constructor(tags: Tag[], parts: Part[]){
        this.tags = tags
        this.parts = parts
        this.tags.forEach((tag) => {
            if(tag.tag === "title")
                this.title = tag.content
            if(tag.tag === "artist")
                this.artist = tag.content
        })


    }

    toText() {
        let song = ""
        if(this.title !== "")
            song += "\nTitle: " + this.title
        if(this.artist !== "")
            song += "\nArtist: " + this.artist

        this.parts.forEach((part) => {
            song += "\n" + part.name.toUpperCase()
            part.lines.forEach((line) => {
                let lastPos = 0
                song += "\n"
                line.chords.forEach((chord) => {
                    for(let i = 0; i<chord.position - lastPos; i++)
                        song+=" "
                    song += chord.chord
                    lastPos = chord.chord.length+chord.position
                })
                song += "\n"+line.lyrics
            })
        })
        return song
    }
}

export class Part{
    name: string
    lines: Line[]

    constructor(name: string, lines: Line[]){
        this.name = name
        this.lines = lines
    }
}

