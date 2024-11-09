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
                <UserInfo />
            </div>
        </div>
    )
}

const UserInfo = () => {
    const [age, setAge] = React.useState('');
    const { isAuthenticated, user } = useAuth();
    // console.log(user)
    const [formState, setFormState] = useState({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        birthday: dayjs("2024-11-04T16:00:00.000Z"),
        language: user.language,
        country: user.country,
        interests: user.interests,
        avatar: user.avatar
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
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField {...params} label="Interests" placeholder="Favorites" />
                    )}
                    fullWidth
                />
                <Divider className='margin-top' />
                <div className="textfield-group margin-top align-end">
                    <Button variant="outlined" className="outlined-btn">Cancel</Button>
                    <Button variant="contained" className="contained-btn" onClick={handleSave}>Save Profile</Button>
                </div>
            </div>
        </div>
    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

export default Profile