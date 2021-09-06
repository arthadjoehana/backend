const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.json());
const students = [
    { name: "Laura" },
    { name: "Yangchen" },
    { name: "Emran" },
    { name: "Julien" },
    { name: "Elodie" },
    { name: "Anthony" },
    { name: "Artha" },
    { name: "Asad" },
    { name: "Kévin" },
];
app.get('/students', (req, res) => {
    res.json({
        status:"ok",
        data: students,
    })
});

app.post('/students', (req, res) => {
    console.log(req.body)
    const newStudent = req.body;
    students.push(newStudent)
    console.log(newStudent);
    res.json({
        status:"ok",
        message: "students added successfully",
        data: students,
    });
})

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});