import User from "../models/authenticationModel.js";
import Cart from "../models/cartModel.js";
import Products from "../models/productsModel.js";



export const addToCart = async (req,res,next)=>{
    try {
        const userId= req.params.userId;
        const productId = req.params.id;
        
        // find user 
        const user = await User.findById(userId);
        if(!user){
          return res.status(404).json({message:"User NotFound!"});
        }
       if(user.isDeleted === true ) return res.status(210).json({message:"Admin Blocked"});
       //Find product by id
       const product=await Products.findById(productId);
       if(!product){
        return res.status(404).json({message:'Product Not Found!'});
       }
       // check product already add or not add
       let itemCart= await Cart.findOne({userId:user._id,productId:product._id});
       if(itemCart){
        //increment quantity
        itemCart.quantity++;
        await itemCart.save();
        return res.status(200).json({message:"Cart product increment quantity"});
       }else{
        //create cart
        itemCart= await Cart.create({
            userId:user._id,
            productId:product._id,
            quantity:1
        });
        // add item in cart 
        user.cart.push(itemCart._id);
        await user.save();
        return res.status(200).json({message:"Product add to cart successfully"});
       }
    } catch (error) {
        return res.status(400).json({message:"Server error"});
        next(error);
    }
}

// view  product from cart    


export const viewCart = async (req, res, next) => {
    try {
        const {id} = req.params; 
        const user = await User.findById(id)
        .populate({
            path: 'cart',
            populate: { path: 'productId'}
        });

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
            // admin blocking checking
            // if(user.isDeleted == true ) return res.status(400).json({message:"Admin blocked you"});


        if(!user.cart || user.cart.length === 0){
            return res.status(200).json({message: "User cart is empty", data: []});
        }
        res.status(200).json(user.cart);

    } catch (error) {
       return next(error);
    }
}

// Add cart quantity
export const incrementCartItemQuantity = async (req, res) => {

    try {
        const userId = req.params.userid;
        const productId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(209).json({ status: "error", message: "User not found" });
        }

        // Find product by ID
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(209).json({ status: "error", message: "Product not found" });
        }
        // Find or create cart item
        try {
            
            let cartItem = await Cart.findOne({userId:user._id,productId:product._id});
            console.log("hhs",cartItem);
            if (!cartItem) {
                return res.status(260).json({ status: "error", message: "Cart item not found" });
            }
               cartItem.quantity++;
                await cartItem.save();
    
            return res.status(201).json({ status: "Ok", message: "Quantity incremented" });
            // if (product.stock > 0) {
            //     cartItem.quantity++;
            //     await cartItem.save();
            // } else {
            //     return res.status(500).json({ status: "error", message: "No stock" });
            // }
        } catch (error) {
            return res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
        }
    } catch (error) {
        return res.status(500).json({message:'server error'})
    }
       
};



export const decrementCartItemQuantity = async (req, res, next) => {
    try {
        const userId = req.params.userid;
        const productId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(209).json({ status: "error", message: "User not found" });
        }

        // Find product by ID
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(209).json({ status: "error", message: "Product not found" });
        }
        // Find or create cart item
        try {
            
            let cartItem = await Cart.findOne({userId:user._id,productId:product._id});
            console.log("hhs",cartItem);
            if (!cartItem) {
                return res.status(260).json({ status: "error", message: "Cart item not found" });
            }
            console.log(cartItem);
            if(cartItem.quantity>1){
                cartItem.quantity--;
                await cartItem.save();
    
            return res.status(201).json({ status: "Ok", message: "Quantity decremented" });
            }
             
            // if (product.stock > 0) {
            //     cartItem.quantity++;
            //     await cartItem.save();
            // } else {
            //     return res.status(500).json({ status: "error", message: "No stock" });
            // }
        } catch (error) {
            return res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
        }
    } catch (error) {
        return res.status(500).json({message:'server error'})
    }
       
};

// Remove A cart 


export const removeCart = async (req, res, next) => {
    try {
        const { userId, itemId } = req.params;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }
           // admin blocking checking
        //    if(user.isDeleted == true ) return res.status(400).json({message:"Admin blocked you"});
                                                                   
        // Find product by ID
        const product = await Products.findById(itemId);
        if (!product) {
            return res.status(200).json({ message: "Product not found" });
        }

        // Find and delete cart item for the specific user and product
        const cartItem = await Cart.findOneAndDelete({ userId: user._id, productId: product._id });

        if (!cartItem) {
            return res.status(200).json({ message: "Product not found in the user's cart" });
        }

        // Find the index of the cart item in the user's cartItems array
        const cartItemIndex = user.cart.findIndex(item => item.equals (cartItem._id));

        // If the cart item is found, remove it from the user's cartItems array
        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex, 1);
            await user.save();
        }

        return res.status(200).json({ message: "Product removed successfully" });

    } catch (error) {
        return next(error);
    }
};
