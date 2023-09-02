import React,{useState}  from 'react'
import Dropdown from './Dropdown'

const Navbar = () => {
  const handleSubmit = (e) => {
    
    e.preventDefault() ;
  }
  const [searchtext, setSearchText] = useState("")
  
  return (
    <div>
      <nav className='bg-[#231e3b] z-50 fixed w-full top-0 px-10 flex justify-between  items-center'>
        <div className="logo w-full md:w-fit flex justify-center items-center">
          <a href="/">
          <img className='md:h-14 h-16' src='https://i.postimg.cc/vBrDHnS9/Sagon-Studio-Logo-Template-3.png' alt="" />
          </a>
        </div>
        <div className='hidden md:block Search-feed relative -left-8 ' >
          <form className='flex bg-white px-2 rounded-full  shadow-md shadow-black' onSubmit={handleSubmit}>
            <input className='mx-2  w-80 focus:outline-none' value={searchtext} type="text" name="searchtext" id="searchtext" onChange={e => {setSearchText(e.target.value) ; console.log(e.target.value)}} />
            <svg className="shadow-sm" width="26" height="30" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.5367 27.5376L19.6747 19.1684C20.8947 17.4894 21.5547 15.4365 21.5547 13.2773C21.5547 10.6928 20.6071 8.26934 18.8936 6.44209C17.1802 4.61484 14.8976 3.60938 12.4727 3.60938C10.0478 3.60938 7.76514 4.61807 6.05166 6.44209C4.33516 8.26611 3.39062 10.6928 3.39062 13.2773C3.39062 15.8587 4.33818 18.2886 6.05166 20.1126C7.76514 21.9398 10.0447 22.9453 12.4727 22.9453C14.501 22.9453 16.4264 22.2428 18.0036 20.9473L25.8656 29.3133C25.8887 29.3378 25.916 29.3573 25.9462 29.3706C25.9763 29.3839 26.0086 29.3907 26.0412 29.3907C26.0738 29.3907 26.1061 29.3839 26.1362 29.3706C26.1664 29.3573 26.1937 29.3378 26.2168 29.3133L27.5367 27.9114C27.5598 27.8869 27.5781 27.8577 27.5906 27.8257C27.6031 27.7936 27.6095 27.7592 27.6095 27.7245C27.6095 27.6898 27.6031 27.6554 27.5906 27.6233C27.5781 27.5913 27.5598 27.5621 27.5367 27.5376V27.5376ZM17.268 18.382C15.9844 19.7452 14.283 20.4961 12.4727 20.4961C10.6623 20.4961 8.96094 19.7452 7.67734 18.382C6.39678 17.0156 5.69141 15.2045 5.69141 13.2773C5.69141 11.3502 6.39678 9.53584 7.67734 8.17266C8.96094 6.80947 10.6623 6.05859 12.4727 6.05859C14.283 6.05859 15.9874 6.80625 17.268 8.17266C18.5485 9.53906 19.2539 11.3502 19.2539 13.2773C19.2539 15.2045 18.5485 17.0188 17.268 18.382Z" fill="#A9A7A7" />
            </svg>
          </form>
        </div>
        <div className='absolute top-3 right-3 md:top-0 md:right-0 md:relative'>
            <div className='w-10 h-10 mx-1'>
              <Dropdown/>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar