import Note from "../models/Notes.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note Created Successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note Deleted successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Internal Server error" });
  }
}
