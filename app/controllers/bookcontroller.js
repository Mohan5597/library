const Book=require('../models/books')

module.exports.list=(req,res) =>{
    Book.find()
        .then(books =>{
            res.send(books)
        })
        .catch(err =>{
            res.send(err)
        })
}

module.exports.show=(req,res) =>{
    const id=req.params.id
    Book.findOne({
        _id:id,
    })
    .then(books =>{
        res.send(books)
    })
    .catch(err =>{
        res.send(err)
    })
}

module.exports.create=(req,res) =>{
    const data=req.body
    const book=new Book(data)
    book.adminId=req.admin._id
    book.save()
    .then(books =>{
        res.send(books)
    })
    .catch(err =>{
        res.send(err)
    })
}

module.exports.update=(req,res) =>{
    const id=req.params.id
    const  body=req.body
    Book.findByIdAndUpdate({
        _id:id,
    },{$set:body},{new:true})
        .then(books =>{
            res.send(books)
        })
        .catch(err =>{
            res.send(err)
        })
}

module.exports.destroy=(req,res) =>{
    const id=req.params.id
    Book.findByIdAndDelete({
        _id:id,
        adminId:req.admin._id
    })
    .then(books =>{
        res.send(books)
    })
    .catch(err =>{
        res.send(err)
    })
}