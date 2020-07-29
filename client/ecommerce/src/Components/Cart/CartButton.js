import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { grey } from '@material-ui/core/colors';
import { Badge } from '@material-ui/core'


const CartButton = (props) => {
    const { cartLength } = props
    return (
        <IconButton aria-label="cart" style={{ color: grey[50] }}>
            <Badge badgeContent={cartLength} color="error" showZero>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
    )
}

export default CartButton