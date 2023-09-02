import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import user from '../images/user.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';
import { bindActionCreators } from 'redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dropdown = () => {
  const dispatch = useDispatch();
  const { getuserData } = bindActionCreators(actionCreators, dispatch)
  const userData = useSelector(state => state.userData);
  useEffect(() => {
    getuserData() ;
    // eslint-disable-next-line
  }, [])
  
    const handleClick = () => {
        localStorage.setItem('token' , '') ;
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <img className='w-10 h-10 object-cover rounded-full' src={userData.profileImage===""?user:userData.profileImage} alt=""/>
          
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/Profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <form method="" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="none"
                    onClick={handleClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown ;