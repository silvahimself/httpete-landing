'use client'
import { ChevronLeft, ChevronRight, User, CreditCard, Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";


type SettingsSidebarProps = {
  activePage: string,
  setActivePage: (page: string) => void;
};
const options = [
  {
    name: 'Profile',
    icon: <User/>,
  }, 
  {
    name: 'Account',
    icon: <Settings2/>
  }, 
  {
    name: 'Billing',
    icon: <CreditCard />
  }]

const SettingsSidebar = (props: SettingsSidebarProps) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false)

  return (
    <div className="bg-gray-800 border-r-2 border-red-400 p-6 shadow-md transition-all duration-300 ease-in-out">
      {isLeftSidebarCollapsed
        ? <ChevronRight className='hover:text-gray-300 text-gray-500'  style={{ position: 'absolute', bottom:'2rem' }} size={32} onClick={() => setIsLeftSidebarCollapsed(false)} />
        : 
        <div className="flex gap-2 hover:text-gray-300 text-gray-500" style={{ position: 'absolute', bottom:'2rem' }}
        onClick={() => setIsLeftSidebarCollapsed(true)}
        >
        <ChevronLeft size={32} />
          <span className="mt-1">Collapse</span>
        </div>}
      <div className={`${isLeftSidebarCollapsed ? 'w-8' : 'w-64'}`}>
        {isLeftSidebarCollapsed
          ? <div className="mt-2">
          {options.map(x =>
                <Button variant={'secondary'} 
                  style={{marginLeft:'-0.5rem'}}
                onClick={() => {props.setActivePage(x.name)}}
                  className={
                    "mb-3"
                    +(props.activePage === x.name ? ' bg-white text-black' : ' bg-gray-700 text-white')}>
                  {x.icon}

                </Button>
              )}
          </div>
          : <>
            <section>
              <div style={{ fontSize: '20pt' }}>
                <h1>Settings</h1>
              </div>
            </section>
            <section className="mt-4">
              {options.map(x =>
                <Button variant={'secondary'} 
                onClick={() => {props.setActivePage(x.name)}}
                  className={
                    "flex flex-row w-full mb-5 "
                    +(props.activePage === x.name ? ' bg-white text-black' : ' bg-transparent border-2 text-white')}>
                  {x.icon}
                  <span>{x.name}</span>
                </Button>
              )}
            </section>


          </>}
      </div>

    </div>
  )
}

export default SettingsSidebar;