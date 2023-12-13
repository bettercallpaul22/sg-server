import * as z from 'zod'


export const login_schema = z.object({
    email: z.string().email('Please enter a valid email').min(3).trim(),
    password: z.string().min(6, 'password must be at leaast 6 characters long').trim()
})

export const register_schema = z.object({
    firstName: z.string().min(3, 'first name must be at leaast 6 characters long').trim().toLowerCase(),
    lastName: z.string().min(3, 'last name must be at leaast 6 characters long').trim().toLowerCase(),
    email: z.string().email('Please enter a valid email').min(3).trim(),
    password: z.string().min(6, 'password must be at leaast 6 characters long').trim()
})
export const product_schema = z.object({
    owner_id: z.string().trim(),
    product_name: z.string().min(3, 'last name must be at leaast 3 characters long'),
    product_price: z.number().min(2, 'last name must be at leaast 2 characters long'),
    product_category: z.string().min(3, 'last name must be at leaast 3 characters long'),
    product_condition: z.string().min(3, 'last name must be at leaast 2 characters long'),
    product_desc: z.string().min(3, 'last name must be at leaast 3 characters long'),
    deal_type: z.string().min(3, 'last name must be at leaast 3 characters long'),
})

