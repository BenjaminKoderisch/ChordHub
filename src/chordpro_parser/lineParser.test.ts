import {parseLine} from "./lineParser" 
import {Line, Chord, Tag} from "./chordproObjects"


test('line with just text', () => {
    let line = new Line("Test", [])
    expect(parseLine("Test")).toStrictEqual(line)
})

test('line with text and chord', () => {
    let chord = new Chord(0, 'Em')
    let line = new Line("Test", [chord])
    expect(parseLine("[Em]Test")).toStrictEqual(line)
})

test('line with text and two chords', () => {
    let chord = new Chord(0, 'Em')
    let chord2 = new Chord(5, 'Am')
    let line = new Line("Test Hallo", [chord, chord2])
    expect(parseLine("[Em]Test [Am]Hallo")).toStrictEqual(line)
})

test('line with text and 2 same chords', () => {
    let chord = new Chord(0, 'Em')
    let chord2 = new Chord(5, 'Em')
    let line = new Line("Test Hallo", [chord, chord2])
    expect(parseLine("[Em]Test [Em]Hallo")).toStrictEqual(line)
})

test('line with tag', () => {
    let tag = new Tag("c", "comment")
    expect(parseLine("\{c: comment\}")).toStrictEqual(tag)
})

test('line is comment', () => {
    expect(parseLine("#comment")).toStrictEqual(null)
})

test('line is empty', () => {
    expect(parseLine("")).toStrictEqual(new Line("", []))
})
