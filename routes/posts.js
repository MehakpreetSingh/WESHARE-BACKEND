const express = require('express') ;
const fetchuser = require('../middleware/fetchuser');
const { find } = require('../models/postMessage');
const PostMessage = require('../models/postMessage');
var router = express.Router() ;



//Fetching all the posts 
router.get("/" , async(req,res) => {
    try {
        const allposts = await PostMessage.find() ;
        res.status(200).json(allposts) ;
        
    } catch (error) {
        res.status(409).json({message:error.message}) ;
    }
}) 

router.get("/fetchUserPosts", fetchuser , async(req,res) => {
    try {
        const myposts = await PostMessage.find({user:req.user.id}) ;
        res.status(200).json(myposts) ;
        
    } catch (error) {
        res.status(409).json({message:error.message}) ;
    }
})

//Fetching A single post {Require Id of the Post} ;
router.get("/:id" , async(req,res) => {
    const {id} = req.params ;
    try {
        const fetchedPost = await PostMessage.findById(id) ;
        res.status(200).json(fetchedPost) ;
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})

//Posting A New Post 
router.post("/createPost" ,fetchuser , async (req, res) => {
    const {title , message , creator , tags , selectedFile} = req.body ;
    const newpost = new PostMessage({user:req.user.id ,title , message , selectedFile , creator , tags}) ;

    try {
        await newpost.save() ;
        res.status(200).json(newpost) ;
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }

})

// Update the Post by Id 
router.put("/:id" , fetchuser, async (req,res) => {
    const { id } = req.params;
    const {title , message , selectedFile , creator , tags} = req.body ;
    const toupdatepost = {} ;
    if(title) {toupdatepost.title=title}
    if(message) {toupdatepost.message=message}
    if(selectedFile) {toupdatepost.selectedFile=selectedFile}
    if(creator) {toupdatepost.creator=creator}
    if(tags!==[]) {toupdatepost.tags=tags}
    try {
        let getpostbyid = await PostMessage.findById(id) ;
        if(getpostbyid) {
            if(getpostbyid.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            getpostbyid = await PostMessage.findByIdAndUpdate(id, {$set:toupdatepost} , {new:true})
            res.status(200).json(getpostbyid) ;
        }else {
            res.status(404).send("Post with id not found")
        }
        
    } catch (error) {
        res.status(409).json({message : error.message})
    }

})

router.post("/searchtags/:query" , fetchuser , async(req,res) => {
    const {query} = req.params ;
    console.log(query.split(","))
    try {
        let posts = await PostMessage.find({tags:{$in : query.split(',')}}).limit(4);
        console.log(posts);
        res.status(200).json(posts) ;
    } catch (error) {
        res.status(409).json({message : error.message})
    }
})

router.delete("/:id" , fetchuser , async(req,res) => {
    const {id} = req.params ;
    try {
        let todeletepost = await PostMessage.findById(id) ;
        if(todeletepost) {
            if(todeletepost.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            await PostMessage.findByIdAndDelete(id) ;
            res.status(200).send("Post is Deleted") ;
        }else {
            res.status(404).send("The Post with this id is not Found") ;
        }
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})

router.put("/:id/likePost" , async(req,res) => {
    const {id} = req.params ;

    try {
        const tolikepost = await PostMessage.findById(id); 
        if(tolikepost) {
            const likedpost = await PostMessage.findByIdAndUpdate(id , {likeCount : tolikepost.likeCount+1} , {new:true}) ;
            res.json(likedpost) ;
        }else {
            res.status(404).send("There is no Post by this id")
        }
    } catch (error) {
        res.status(409).json({message : error.message}) ;
    }
})



module.exports =  router ;