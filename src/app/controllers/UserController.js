const Yup = require('yup')

const User = require('../models/Users')

module.exports = {
    async store(req, res) {
        const Schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        })

        if(!(await Schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'})
        }
        
        const userExists = await User.findOne({ where: { email: req.body.email } })
        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' })
        }

        // const { name, email, password } = req.body
        
        try {
            const { id, name, email } = await User.create( req.body)
            return res.json({ id, name, email })
        } catch (error) {
            return res.status(400).json({'messageError': 'incorrect filds'})
        }   
    },

    async index(req, res) {
        const userAll = await User.findAll()
        if(userAll.length === 0) {
            return res.json({ 'messageSuccess': 'Empty user list' })
        }
        return res.json(userAll)
    },

    async show(req, res) {

        const id = req.params.id
        const { name, email } = await User.findOne({ where: {id: id} })

        if(!email) {
            return res.status(400).json({'messageError': 'User not found'})
        }

        return res.json({id, name, email})
    },

    async update(req, res) {

        const Schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string()
        })

        if(!(await Schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'})
        }


        const id = req.params.id

        const userExists  = await User.findOne({ where: {id: id} })

        if(!userExists) {
            return res.status(400).json({'messageError': 'User not found'})
        }
        
        const user = req.body

        try {
            await User.update( user , { where: {id: id} })
            return res.status(200).json({ 'messageSuccess': 'User update successfully' })  
        } catch (error) {
            return res.status(400).json({'messageError': 'incorrect filds'})
        }


        // const userUpdate = await User.update(user)
    },
    async delete (req, res) {
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({'messageError': 'Incomplete data, email required'})
        }
        
        const {email} = req.body
        const user = await User.findOne({where: {email: email}})
        if(!user) {
            return res.status(400).json({'messageError': 'User not found'})
        } else {
            await User.destroy({where: {email: email}})
            return res.status(200).json({ 'messageSuccess': 'User removed successfully' })
        }
    }
}