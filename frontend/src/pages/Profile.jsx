import React, { useState, useEffect, useRef } from 'react'
import './styles/Profile.css'
import { FaUser, FaBookOpen, FaInbox } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useAuth } from '../auth/AuthContext';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { FaShoppingCart } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';

const Profile = () => {
    const [currentPage, setCurrentPage] = useState('User Information')

    return (
        <div className="profile-container">
            <div className="side">
                <div className="profile-info">
                    <div className="profile-title">
                        {currentPage}
                    </div>
                </div>
                <div className="profile-navigation">
                    <div
                        className={`profile-nav__item ${currentPage == 'User Information' ? 'active' : ''}`}
                        onClick={() => { setCurrentPage('User Information') }}
                    >
                        <FaUser />
                        &nbsp;
                        User Information
                    </div>
                    <div
                        className={`profile-nav__item ${currentPage == 'Cart' ? 'active' : ''}`}
                        onClick={() => { setCurrentPage('Cart') }}
                    >
                        <FaShoppingCart />
                        &nbsp;
                        Cart
                    </div>
                    <div
                        className={`profile-nav__item ${currentPage == 'Enrolled Courses' ? 'active' : ''}`}
                        onClick={() => { setCurrentPage('Enrolled Courses') }}
                    >
                        <FaBookOpen />
                        &nbsp;
                        Enrolled Courses
                    </div>
                    <div
                        className={`profile-nav__item ${currentPage == 'Inbox' ? 'active' : ''}`}
                        onClick={() => { setCurrentPage('Inbox') }}
                    >
                        <FaInbox />
                        &nbsp;
                        Inbox
                    </div>
                    <div
                        className={`profile-nav__item ${currentPage == 'Account Settings' ? 'active' : ''}`}
                        onClick={() => { setCurrentPage('Account Settings') }}
                    >
                        <FaGears />
                        &nbsp;
                        Account Settings
                    </div>
                </div>
            </div>
            <div className="main">
                {
                    currentPage == 'User Information' ? (
                        <UserInfo />
                    ) : currentPage == 'Cart' ? (
                        <Cart />
                    ) : (
                        <div></div>
                    )
                }

            </div>
        </div>
    )
}

const UserInfo = () => {
    const [age, setAge] = React.useState('');
    const { isAuthenticated, user } = useAuth();
    // console.log(user)
    const [categoryOptions, setCategoryOptions] = useState()
    const fetchCat = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/category`)
            setCategoryOptions(res.data.data)
            console.log(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCat()
    }, [])

    const [formState, setFormState] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        birthday: dayjs("2024-11-04T16:00:00.000Z"),
        language: user.language,
        country: user.country,
        interests: user.interests,
        avatar: user.avatar,
        membership_type: user.membership_type
    });
    const [image, setImage] = useState(user.avatar[0].url)

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const newImages = [];
        setImage([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result)
                    newImages.push(reader.result);
                }
            }
            reader.readAsDataURL(file)
        })
        setFormState((prevState) => ({
            ...prevState,
            avatar: newImages,
        }));
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormState({
            ...formState,
            birthday: date,
        });
    };

    const handleInterestsChange = (event, newValue) => {
        setFormState({
            ...formState,
            interests: newValue,
        });
    };

    const language = [
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Dutch",
        "Russian",
        "Chinese (Simplified)",
        "Japanese",
        "Korean",
        "Arabic",
        "Hindi",
        "Turkish",
        "Swedish",
        "Danish",
        "Finnish",
        "Norwegian",
        "Polish",
        "Greek",
        "Czech",
        "Hungarian",
        "Romanian",
        "Thai",
        "Vietnamese",
        "Indonesian",
        "Hebrew",
        "Bengali",
        "Ukrainian",
        "Malay"
    ];

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
        "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
        "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
        "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia",
        "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
        "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
        "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
        "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
        "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
        "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
        "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal",
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
        "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
        "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
        "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
        "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
        "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
        "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
        "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const handleSave = async () => {
        try {
            const saveProfilePromise = axios.put(`http://localhost:8000/api/user/${user._id}`, formState)

            toast.promise(saveProfilePromise, {
                loading: 'Saving Profile...',
                success: 'Profile saved successfully!',
                error: 'Unsuccessful: Changes to profile are not saved.'
            });

            const res = await saveProfilePromise
            console.log(res)
            setImage(res.data.data.avatar[0].url)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="personal-info">
            <h4>Personal Information</h4>
            <Divider />
            <div className="prime-container">
                <div className="general-info">
                    <div className="image-container" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                        <img src={image} alt="" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            name="avatar"
                        />
                    </div>
                    <div className="textfield-group">
                        <TextField id="outlined-basic" label="Email" value={formState.email} name="email" variant="outlined" className="text-field" onChange={handleOnChange} />
                        <TextField id="outlined-basic" label="First Name" value={formState.first_name} name="first_name" variant="outlined" className="text-field" onChange={handleOnChange} />
                        <TextField id="outlined-basic" label="Last Name" value={formState.last_name} name="last_name" variant="outlined" className="text-field" onChange={handleOnChange} />
                    </div>
                </div>
                <div className="textfield-group margin-top">
                    <FormControl fullWidth>
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={formState.gender}
                            label="Gender"
                            name="gender"
                            onChange={handleOnChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker name="birthday" value={formState.birthday} label="Birthday" onChange={handleDateChange} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="textfield-group margin-top">
                    <FormControl fullWidth>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={formState.language}
                            label="Language"
                            onChange={handleOnChange}
                            name="language"
                        >
                            {language.map((lang) => (
                                <MenuItem key={lang} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="language-select-label">Country</InputLabel>
                        <Select
                            labelId="Countries-select-label"
                            id="Countries-select"
                            value={formState.country}
                            label="Country"
                            onChange={handleOnChange}
                            name="country"
                        >
                            {countries.map((country) => (
                                <MenuItem key={country} value={country}>
                                    {country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <Divider className='margin-top' />
                <h4>Course Interests</h4>
                <Autocomplete
                    value={formState.interests}
                    onChange={handleInterestsChange}
                    className='margin-top'
                    multiple
                    name="interests"
                    id="multiple-limit-tags"
                    options={categoryOptions}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="Interests" placeholder="Interests" />
                    )}
                    fullWidth
                />
                <Divider className='margin-top' />
                <h4>Membership Type</h4>
                <TextField readonly id="outlined-basic" label="Membership Type" variant="outlined" className="text-field" value={formState.membership_type} />
                <Divider className='margin-top' />
                <div className="textfield-group margin-top align-end">
                    <Button variant="outlined" className="outlined-btn">Cancel</Button>
                    <Button variant="contained" className="contained-btn" onClick={handleSave}>Save Profile</Button>
                </div>
            </div>
        </div>
    )
}

const Cart = () => {
    const { isAuthenticated, user } = useAuth();
    const [total, setTotal] = useState(0)
    const [deduc, setDeduc] = useState(0)
    const [memDeduc, setMemDeduc] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    useEffect(() => {
        calculateTotal()
    }, [])

    useEffect(() => {
        calculateTotal()
    }, [selectedItems])

    const calculateTotal = () => {
        let total = 0;
        selectedItems.forEach((item) => {
            total += item.price;
        });
        setTotal(total);
        if (user.membership_type != '') {
            setMemDeduc(total)
            setTotal(0)
        }
    }

    const handleCheck = (id, price) => {
        setSelectedItems((prevState) => [
            ...prevState, 
            {id: id, price: price}
        ]);
    }
    
    const handleCheckout = async() => {
        try {
            const res = await axios.post(`http://localhost:8000/api/user/process/${user._id}`, selectedItems)
            toast.success(res.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="personal-info">
            <h4>{user.first_name} {user.last_name}'s Cart</h4>
            <Divider />
            <div className="main-with-side">
                <div className="cart-container">
                    <div className="headers">
                        <div></div>
                        <div className="heads">Course</div>
                        <div className="heads">Price</div>
                        <div className="heads">Subtotal</div>
                    </div>
                    <div className="cart-list">
                        {
                            user.cart.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="cart-item">
                                            <div className="checkbox"><Checkbox onChange={() => {handleCheck(item.course_id._id, item.course_id.price)}} /></div>
                                            <div className="item-info">
                                                <div className="item-img__container">
                                                    {
                                                        item.course_id.images.length > 0 ? (
                                                            <img src={item.course_id.images[0].url} alt="" />
                                                        ) : (
                                                            <img src="https://placehold.co/600x400" alt="" />
                                                        )
                                                    }

                                                </div>
                                                <div className="item-gen__info">
                                                    {item.course_id.title}
                                                </div>
                                            </div>
                                            <div className="item-price">{item.course_id.price}</div>
                                            <div className="item-subtotal">
                                                {
                                                    user.membership_type == '' ? (
                                                        item.course_id.price
                                                    ) : (
                                                        0
                                                    )

                                                }
                                            </div>
                                        </div>
                                        < Divider />
                                    </>

                                )
                            })
                        }
                    </div>
                </div>
                <div className="side-container">
                    <div className="coupon-container">
                        <h4>Apply Coupon</h4>
                        <Divider />
                    </div>
                    <div className="subtotal-container">
                        <h4>Cart Total</h4>
                        <Divider />
                        <div className="cart-total__container-row">
                            <div>Membership Type:</div>
                            <div>{user.membership_type}</div>
                        </div>
                        <div className="cart-total__container-row">
                            <div>Coupon Deduction:</div>
                            <div>$ {deduc}</div>
                        </div>
                        <div className="cart-total__container-row">
                            <div>Memberhip Deduction:</div>
                            <div>$ {memDeduc}</div>
                        </div>
                        <div className="cart-total__container-row">
                            <div>Amount Total:</div>
                            <div>$ {total}</div>
                        </div>
                    </div>
                    <Button className='flex-grow whiteout-button' variant="contained" onClick={() => {handleCheckout()}}>Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Profile