import {z} from "zod";
// import isPostalCode from "validator/lib/isPostalCode"


export const userSchema = z.object({
    first_name: z.string().min(3, "Your data is too short, the minimum length is 3 letters").max(60, "Your data is too long").optional(),
    last_name: z.string().min(3, "Your data is too short, the minimum length is 3 letters ").max(100, "Your data is too long"),
    email: z.string().email(),
    initials: z.string().max(3, "Please enter a valid initials").optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
});


export const addressSchema = z.object({
    address_type: z.enum(["HOME", "WORK"]),
    post_code: z.string().min(4, "A post code is too short").max(7, "A post code is too long")
        .regex(/^[0-9A-Za-z]+$/, "Post code should contain only alphanumeric characters"),
    city: z.string().min(3, "The city name is too short, the minimum length is 3 letters").max(60, "Please enter a valid city name"),
    country_code: z.string()
        .length(3, "Please enter a valid 3 letter country code (ISO 3166-1 alpha-3)")
        .toUpperCase(),
    street: z.string().max(100, "Please enter a valid street name"),
    building_number: z.string().min(1, 'Please enter a valid building number, the minimum length is 1 letter or digit')
        .max(60, "Please enter a valid building number")
        .regex(/^[a-zA-Z0-9]+$/, "Building number should contain only letters and digits"),
    valid_from: z.string().transform((val) => new Date(val)),
})
//.refine((data) => isPostalCode(data, "PL"), "Enter the zip code"),