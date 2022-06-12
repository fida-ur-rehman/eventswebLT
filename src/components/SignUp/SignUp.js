import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import "./SignUp.scss"
import axios from 'axios'
import {CJ} from '../../Assets/CountryJson'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import SimpleBackdrop from '../utils/SimpleBackdrop'
import Alert from '@mui/material/Alert'
const SignUp = (props) => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    console.log(errors)
    const [open, setOpen] = React.useState(false);
    const [error,setError]=React.useState("")
    
    const onSubmit = (data,e)=>{
        setOpen(true)
        let code = countries.filter(item=>item.label===data.code)
        let number = '+'+code[0].phone+data.phone;
        let currency = currencyCodes.filter(curr=>curr.country===data.code)
        currency = currency[0].currency_code
        console.log(currency);
        
        
         axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/auth/sendOTP`,{phone:number})
        .then(res=>{
            console.log(res);
            setOpen(false)
            if(res.status === 200){
            props.history.push('/otp',{data:res.data,curr:currency})
            }
        })
        .catch(err=>{
            console.log(err)
            setOpen(false)
            setError("check your internet, if connected unblock the site from your firewall or ISP")
        })
    }
    return (
        <div className="signupdiv">
            <SimpleBackdrop open={open} />
            <form className="shadow form" onSubmit = {handleSubmit(onSubmit)}>
            <h1>Sign In</h1>
            <div className="start inputdiv ">
               
                <Autocomplete
      id="country-select-demo"
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
          
        !errors.code?<TextField
        {...register('code',{required:true})} 
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />:
        <TextField
        {...register('code',{required:true})} 
          {...params}
          error
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
        
      )}
    />
               
      
                
                {errors.phone?
                <TextField 
                sx={{width:"100%",marginTop:5}}
                id="outlined-basic" label="Mobile Number" variant="outlined" {...register('phone',{required:true})} 
                error
                helperText="Enter a valid Mobile Number"
                 />
                :<TextField 
                sx={{width:"100%", marginTop:5}}
                id="outlined-basic" label="Mobile Number" variant="outlined" {...register('phone',{required:true})} 
                 />}
               
            </div>
            <Button type="submit" size="large" variant="contained" className="btn-purple">Get OTP</Button>
            {
                error.length>0?<Alert sx={{margin:"3% 10%"}} severity="error">{error}</Alert>:null
            }
            </form>
        </div>
    );
    
}

export default SignUp;
const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      label: 'Taiwan, Province of China',
      phone: '886',
    },
    {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
  ];


  const currencyCodes =[
    {
        "country": "Afghanistan",
        "currency_code": "AFN"
    },
    {
        "country": "Albania",
        "currency_code": "ALL"
    },
    {
        "country": "Algeria",
        "currency_code": "DZD"
    },
    {
        "country": "American Samoa",
        "currency_code": "USD"
    },
    {
        "country": "Andorra",
        "currency_code": "EUR"
    },
    {
        "country": "Angola",
        "currency_code": "AOA"
    },
    {
        "country": "Anguilla",
        "currency_code": "XCD"
    },
    {
        "country": "Antarctica",
        "currency_code": "XCD"
    },
    {
        "country": "Antigua and Barbuda",
        "currency_code": "XCD"
    },
    {
        "country": "Argentina",
        "currency_code": "ARS"
    },
    {
        "country": "Armenia",
        "currency_code": "AMD"
    },
    {
        "country": "Aruba",
        "currency_code": "AWG"
    },
    {
        "country": "Australia",
        "currency_code": "AUD"
    },
    {
        "country": "Austria",
        "currency_code": "EUR"
    },
    {
        "country": "Azerbaijan",
        "currency_code": "AZN"
    },
    {
        "country": "Bahamas",
        "currency_code": "BSD"
    },
    {
        "country": "Bahrain",
        "currency_code": "BHD"
    },
    {
        "country": "Bangladesh",
        "currency_code": "BDT"
    },
    {
        "country": "Barbados",
        "currency_code": "BBD"
    },
    {
        "country": "Belarus",
        "currency_code": "BYR"
    },
    {
        "country": "Belgium",
        "currency_code": "EUR"
    },
    {
        "country": "Belize",
        "currency_code": "BZD"
    },
    {
        "country": "Benin",
        "currency_code": "XOF"
    },
    {
        "country": "Bermuda",
        "currency_code": "BMD"
    },
    {
        "country": "Bhutan",
        "currency_code": "BTN"
    },
    {
        "country": "Bolivia",
        "currency_code": "BOB"
    },
    {
        "country": "Bosnia and Herzegovina",
        "currency_code": "BAM"
    },
    {
        "country": "Botswana",
        "currency_code": "BWP"
    },
    {
        "country": "Bouvet Island",
        "currency_code": "NOK"
    },
    {
        "country": "Brazil",
        "currency_code": "BRL"
    },
    {
        "country": "British Indian Ocean Territory",
        "currency_code": "USD"
    },
    {
        "country": "Brunei",
        "currency_code": "BND"
    },
    {
        "country": "Bulgaria",
        "currency_code": "BGN"
    },
    {
        "country": "Burkina Faso",
        "currency_code": "XOF"
    },
    {
        "country": "Burundi",
        "currency_code": "BIF"
    },
    {
        "country": "Cambodia",
        "currency_code": "KHR"
    },
    {
        "country": "Cameroon",
        "currency_code": "XAF"
    },
    {
        "country": "Canada",
        "currency_code": "CAD"
    },
    {
        "country": "Cape Verde",
        "currency_code": "CVE"
    },
    {
        "country": "Cayman Islands",
        "currency_code": "KYD"
    },
    {
        "country": "Central African Republic",
        "currency_code": "XAF"
    },
    {
        "country": "Chad",
        "currency_code": "XAF"
    },
    {
        "country": "Chile",
        "currency_code": "CLP"
    },
    {
        "country": "China",
        "currency_code": "CNY"
    },
    {
        "country": "Christmas Island",
        "currency_code": "AUD"
    },
    {
        "country": "Cocos (Keeling) Islands",
        "currency_code": "AUD"
    },
    {
        "country": "Colombia",
        "currency_code": "COP"
    },
    {
        "country": "Comoros",
        "currency_code": "KMF"
    },
    {
        "country": "Congo",
        "currency_code": "XAF"
    },
    {
        "country": "Cook Islands",
        "currency_code": "NZD"
    },
    {
        "country": "Costa Rica",
        "currency_code": "CRC"
    },
    {
        "country": "Croatia",
        "currency_code": "HRK"
    },
    {
        "country": "Cuba",
        "currency_code": "CUP"
    },
    {
        "country": "Cyprus",
        "currency_code": "EUR"
    },
    {
        "country": "Czech Republic",
        "currency_code": "CZK"
    },
    {
        "country": "Denmark",
        "currency_code": "DKK"
    },
    {
        "country": "Djibouti",
        "currency_code": "DJF"
    },
    {
        "country": "Dominica",
        "currency_code": "XCD"
    },
    {
        "country": "Dominican Republic",
        "currency_code": "DOP"
    },
    {
        "country": "East Timor",
        "currency_code": "USD"
    },
    {
        "country": "Ecuador",
        "currency_code": "ECS"
    },
    {
        "country": "Egypt",
        "currency_code": "EGP"
    },
    {
        "country": "El Salvador",
        "currency_code": "SVC"
    },
    {
        "country": "England",
        "currency_code": "GBP"
    },
    {
        "country": "Equatorial Guinea",
        "currency_code": "XAF"
    },
    {
        "country": "Eritrea",
        "currency_code": "ERN"
    },
    {
        "country": "Estonia",
        "currency_code": "EUR"
    },
    {
        "country": "Ethiopia",
        "currency_code": "ETB"
    },
    {
        "country": "Falkland Islands",
        "currency_code": "FKP"
    },
    {
        "country": "Faroe Islands",
        "currency_code": "DKK"
    },
    {
        "country": "Fiji Islands",
        "currency_code": "FJD"
    },
    {
        "country": "Finland",
        "currency_code": "EUR"
    },
    {
        "country": "France",
        "currency_code": "EUR"
    },
    {
        "country": "French Guiana",
        "currency_code": "EUR"
    },
    {
        "country": "French Polynesia",
        "currency_code": "XPF"
    },
    {
        "country": "French Southern territories",
        "currency_code": "EUR"
    },
    {
        "country": "Gabon",
        "currency_code": "XAF"
    },
    {
        "country": "Gambia",
        "currency_code": "GMD"
    },
    {
        "country": "Georgia",
        "currency_code": "GEL"
    },
    {
        "country": "Germany",
        "currency_code": "EUR"
    },
    {
        "country": "Ghana",
        "currency_code": "GHS"
    },
    {
        "country": "Gibraltar",
        "currency_code": "GIP"
    },
    {
        "country": "Greece",
        "currency_code": "EUR"
    },
    {
        "country": "Greenland",
        "currency_code": "DKK"
    },
    {
        "country": "Grenada",
        "currency_code": "XCD"
    },
    {
        "country": "Guadeloupe",
        "currency_code": "EUR"
    },
    {
        "country": "Guam",
        "currency_code": "USD"
    },
    {
        "country": "Guatemala",
        "currency_code": "QTQ"
    },
    {
        "country": "Guinea",
        "currency_code": "GNF"
    },
    {
        "country": "Guinea-Bissau",
        "currency_code": "CFA"
    },
    {
        "country": "Guyana",
        "currency_code": "GYD"
    },
    {
        "country": "Haiti",
        "currency_code": "HTG"
    },
    {
        "country": "Heard Island and McDonald Islands",
        "currency_code": "AUD"
    },
    {
        "country": "Holy See (Vatican City State)",
        "currency_code": "EUR"
    },
    {
        "country": "Honduras",
        "currency_code": "HNL"
    },
    {
        "country": "Hong Kong",
        "currency_code": "HKD"
    },
    {
        "country": "Hungary",
        "currency_code": "HUF"
    },
    {
        "country": "Iceland",
        "currency_code": "ISK"
    },
    {
        "country": "India",
        "currency_code": "INR"
    },
    {
        "country": "Indonesia",
        "currency_code": "IDR"
    },
    {
        "country": "Iran",
        "currency_code": "IRR"
    },
    {
        "country": "Iraq",
        "currency_code": "IQD"
    },
    {
        "country": "Ireland",
        "currency_code": "EUR"
    },
    {
        "country": "Israel",
        "currency_code": "ILS"
    },
    {
        "country": "Italy",
        "currency_code": "EUR"
    },
    {
        "country": "Ivory Coast",
        "currency_code": "XOF"
    },
    {
        "country": "Jamaica",
        "currency_code": "JMD"
    },
    {
        "country": "Japan",
        "currency_code": "JPY"
    },
    {
        "country": "Jordan",
        "currency_code": "JOD"
    },
    {
        "country": "Kazakhstan",
        "currency_code": "KZT"
    },
    {
        "country": "Kenya",
        "currency_code": "KES"
    },
    {
        "country": "Kiribati",
        "currency_code": "AUD"
    },
    {
        "country": "Kuwait",
        "currency_code": "KWD"
    },
    {
        "country": "Kyrgyzstan",
        "currency_code": "KGS"
    },
    {
        "country": "Laos",
        "currency_code": "LAK"
    },
    {
        "country": "Latvia",
        "currency_code": "LVL"
    },
    {
        "country": "Lebanon",
        "currency_code": "LBP"
    },
    {
        "country": "Lesotho",
        "currency_code": "LSL"
    },
    {
        "country": "Liberia",
        "currency_code": "LRD"
    },
    {
        "country": "Libyan Arab Jamahiriya",
        "currency_code": "LYD"
    },
    {
        "country": "Liechtenstein",
        "currency_code": "CHF"
    },
    {
        "country": "Lithuania",
        "currency_code": "LTL"
    },
    {
        "country": "Luxembourg",
        "currency_code": "EUR"
    },
    {
        "country": "Macao",
        "currency_code": "MOP"
    },
    {
        "country": "North Macedonia",
        "currency_code": "MKD"
    },
    {
        "country": "Madagascar",
        "currency_code": "MGF"
    },
    {
        "country": "Malawi",
        "currency_code": "MWK"
    },
    {
        "country": "Malaysia",
        "currency_code": "MYR"
    },
    {
        "country": "Maldives",
        "currency_code": "MVR"
    },
    {
        "country": "Mali",
        "currency_code": "XOF"
    },
    {
        "country": "Malta",
        "currency_code": "EUR"
    },
    {
        "country": "Marshall Islands",
        "currency_code": "USD"
    },
    {
        "country": "Martinique",
        "currency_code": "EUR"
    },
    {
        "country": "Mauritania",
        "currency_code": "MRO"
    },
    {
        "country": "Mauritius",
        "currency_code": "MUR"
    },
    {
        "country": "Mayotte",
        "currency_code": "EUR"
    },
    {
        "country": "Mexico",
        "currency_code": "MXN"
    },
    {
        "country": "Micronesia, Federated States of",
        "currency_code": "USD"
    },
    {
        "country": "Moldova",
        "currency_code": "MDL"
    },
    {
        "country": "Monaco",
        "currency_code": "EUR"
    },
    {
        "country": "Mongolia",
        "currency_code": "MNT"
    },
    {
        "country": "Montserrat",
        "currency_code": "XCD"
    },
    {
        "country": "Morocco",
        "currency_code": "MAD"
    },
    {
        "country": "Mozambique",
        "currency_code": "MZN"
    },
    {
        "country": "Myanmar",
        "currency_code": "MMR"
    },
    {
        "country": "Namibia",
        "currency_code": "NAD"
    },
    {
        "country": "Nauru",
        "currency_code": "AUD"
    },
    {
        "country": "Nepal",
        "currency_code": "NPR"
    },
    {
        "country": "Netherlands",
        "currency_code": "EUR"
    },
    {
        "country": "Netherlands Antilles",
        "currency_code": "ANG"
    },
    {
        "country": "New Caledonia",
        "currency_code": "XPF"
    },
    {
        "country": "New Zealand",
        "currency_code": "NZD"
    },
    {
        "country": "Nicaragua",
        "currency_code": "NIO"
    },
    {
        "country": "Niger",
        "currency_code": "XOF"
    },
    {
        "country": "Nigeria",
        "currency_code": "NGN"
    },
    {
        "country": "Niue",
        "currency_code": "NZD"
    },
    {
        "country": "Norfolk Island",
        "currency_code": "AUD"
    },
    {
        "country": "North Korea",
        "currency_code": "KPW"
    },
    {
        "country": "Northern Ireland",
        "currency_code": "GBP"
    },
    {
        "country": "Northern Mariana Islands",
        "currency_code": "USD"
    },
    {
        "country": "Norway",
        "currency_code": "NOK"
    },
    {
        "country": "Oman",
        "currency_code": "OMR"
    },
    {
        "country": "Pakistan",
        "currency_code": "PKR"
    },
    {
        "country": "Palau",
        "currency_code": "USD"
    },
    {
        "country": "Palestine",
        "currency_code": null
    },
    {
        "country": "Panama",
        "currency_code": "PAB"
    },
    {
        "country": "Papua New Guinea",
        "currency_code": "PGK"
    },
    {
        "country": "Paraguay",
        "currency_code": "PYG"
    },
    {
        "country": "Peru",
        "currency_code": "PEN"
    },
    {
        "country": "Philippines",
        "currency_code": "PHP"
    },
    {
        "country": "Pitcairn",
        "currency_code": "NZD"
    },
    {
        "country": "Poland",
        "currency_code": "PLN"
    },
    {
        "country": "Portugal",
        "currency_code": "EUR"
    },
    {
        "country": "Puerto Rico",
        "currency_code": "USD"
    },
    {
        "country": "Qatar",
        "currency_code": "QAR"
    },
    {
        "country": "Reunion",
        "currency_code": "EUR"
    },
    {
        "country": "Romania",
        "currency_code": "RON"
    },
    {
        "country": "Russian Federation",
        "currency_code": "RUB"
    },
    {
        "country": "Rwanda",
        "currency_code": "RWF"
    },
    {
        "country": "Saint Helena",
        "currency_code": "SHP"
    },
    {
        "country": "Saint Kitts and Nevis",
        "currency_code": "XCD"
    },
    {
        "country": "Saint Lucia",
        "currency_code": "XCD"
    },
    {
        "country": "Saint Pierre and Miquelon",
        "currency_code": "EUR"
    },
    {
        "country": "Saint Vincent and the Grenadines",
        "currency_code": "XCD"
    },
    {
        "country": "Samoa",
        "currency_code": "WST"
    },
    {
        "country": "San Marino",
        "currency_code": "EUR"
    },
    {
        "country": "Sao Tome and Principe",
        "currency_code": "STD"
    },
    {
        "country": "Saudi Arabia",
        "currency_code": "SAR"
    },
    {
        "country": "Scotland",
        "currency_code": "GBP"
    },
    {
        "country": "Senegal",
        "currency_code": "XOF"
    },
    {
        "country": "Serbia",
        "currency_code": "RSD"
    },
    {
        "country": "Seychelles",
        "currency_code": "SCR"
    },
    {
        "country": "Sierra Leone",
        "currency_code": "SLL"
    },
    {
        "country": "Singapore",
        "currency_code": "SGD"
    },
    {
        "country": "Slovakia",
        "currency_code": "EUR"
    },
    {
        "country": "Slovenia",
        "currency_code": "EUR"
    },
    {
        "country": "Solomon Islands",
        "currency_code": "SBD"
    },
    {
        "country": "Somalia",
        "currency_code": "SOS"
    },
    {
        "country": "South Africa",
        "currency_code": "ZAR"
    },
    {
        "country": "South Georgia and the South Sandwich Islands",
        "currency_code": "GBP"
    },
    {
        "country": "South Korea",
        "currency_code": "KRW"
    },
    {
        "country": "South Sudan",
        "currency_code": "SSP"
    },
    {
        "country": "Spain",
        "currency_code": "EUR"
    },
    {
        "country": "Sri Lanka",
        "currency_code": "LKR"
    },
    {
        "country": "Sudan",
        "currency_code": "SDG"
    },
    {
        "country": "Suriname",
        "currency_code": "SRD"
    },
    {
        "country": "Svalbard and Jan Mayen",
        "currency_code": "NOK"
    },
    {
        "country": "Swaziland",
        "currency_code": "SZL"
    },
    {
        "country": "Sweden",
        "currency_code": "SEK"
    },
    {
        "country": "Switzerland",
        "currency_code": "CHF"
    },
    {
        "country": "Syria",
        "currency_code": "SYP"
    },
    {
        "country": "Tajikistan",
        "currency_code": "TJS"
    },
    {
        "country": "Tanzania",
        "currency_code": "TZS"
    },
    {
        "country": "Thailand",
        "currency_code": "THB"
    },
    {
        "country": "The Democratic Republic of Congo",
        "currency_code": "CDF"
    },
    {
        "country": "Togo",
        "currency_code": "XOF"
    },
    {
        "country": "Tokelau",
        "currency_code": "NZD"
    },
    {
        "country": "Tonga",
        "currency_code": "TOP"
    },
    {
        "country": "Trinidad and Tobago",
        "currency_code": "TTD"
    },
    {
        "country": "Tunisia",
        "currency_code": "TND"
    },
    {
        "country": "Turkey",
        "currency_code": "TRY"
    },
    {
        "country": "Turkmenistan",
        "currency_code": "TMT"
    },
    {
        "country": "Turks and Caicos Islands",
        "currency_code": "USD"
    },
    {
        "country": "Tuvalu",
        "currency_code": "AUD"
    },
    {
        "country": "Uganda",
        "currency_code": "UGX"
    },
    {
        "country": "Ukraine",
        "currency_code": "UAH"
    },
    {
        "country": "United Arab Emirates",
        "currency_code": "AED"
    },
    {
        "country": "United Kingdom",
        "currency_code": "GBP"
    },
    {
        "country": "United States",
        "currency_code": "USD"
    },
    {
        "country": "United States Minor Outlying Islands",
        "currency_code": "USD"
    },
    {
        "country": "Uruguay",
        "currency_code": "UYU"
    },
    {
        "country": "Uzbekistan",
        "currency_code": "UZS"
    },
    {
        "country": "Vanuatu",
        "currency_code": "VUV"
    },
    {
        "country": "Venezuela",
        "currency_code": "VEF"
    },
    {
        "country": "Vietnam",
        "currency_code": "VND"
    },
    {
        "country": "Virgin Islands, British",
        "currency_code": "USD"
    },
    {
        "country": "Virgin Islands, U.S.",
        "currency_code": "USD"
    },
    {
        "country": "Wales",
        "currency_code": "GBP"
    },
    {
        "country": "Wallis and Futuna",
        "currency_code": "XPF"
    },
    {
        "country": "Western Sahara",
        "currency_code": "MAD"
    },
    {
        "country": "Yemen",
        "currency_code": "YER"
    },
    {
        "country": "Zambia",
        "currency_code": "ZMW"
    },
    {
        "country": "Zimbabwe",
        "currency_code": "ZWD"
    }
]