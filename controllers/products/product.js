import Product from "../../models/product/product.js";
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, qty, imageUrl } = req.body;

        const product = new Product({
            name,
            description,
            price,
            qty,
            imageUrl,
            user: req.user._id
        })

        console.log('req.user', req.user)

        await product.save();

        res.status(201).json({ message: "product saved" })
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const data = await Product.find().populate('user', 'email firstName').exec();
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

}

export const getOne = async (req, res) => {
    try {
        // const data = await Product.findById({_id: req.params.id});

        const data = await Product.findById({ _id: req.params.id }).populate('user', 'email firstName').exec();

        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
export const delOne = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({ message: "deleted successfully" })
    }
    catch (error) {
        console.log(error)
    }

}

export const updateProductWithPUT = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const updateProductWithPATCH = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}