import * as fs from 'fs'
import {Tag, Song, Line, Chord, Part} from '../chordproObjects'
import {parseSong} from '../songParser'

test('whole Song', () => {
    const file = fs.readFileSync('src/chordpro_parser/test/testsong.cho', 'utf-8')

    let tag1 = new Tag("title", "Testsong") 
    let tag2 = new Tag("artist", "Benjamin Koderisch")

    let chord1 = new Chord(0, "Em")
    let chord2 = new Chord(13, "Am")
    let line1 = new Line("Hallo du bis  ganz toll", [chord1, chord2])

    let line2 = new Line("auf der Ganzen Welt", [])
    let line3 = new Line("", [])
    let part1 = new Part("Chorus", [line1, line2, line3])


    let chord3 = new Chord(8, "Bm")
    let chord4 = new Chord(19, "D")
    let chord5 = new Chord(24, "C")
    let chord6 = new Chord(29, "F#")
    let line4 = new Line("Und ich liebe dich ganz doll fuer immer", 
                         [chord3, chord4, chord5, chord6])
    let part2 = new Part("Verse", [line4])

    let song = new Song([tag1, tag2], [part1, part2])

    console.log(song.toText())

    expect(parseSong(file)).toStrictEqual(song)
})
