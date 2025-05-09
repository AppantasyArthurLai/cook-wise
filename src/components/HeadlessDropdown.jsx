import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

export default function HeadlessDropdown({ button, items, align = 'right' }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-4 py-2 bg-culinary-accent hover:bg-culinary-accent-dark text-white rounded-lg shadow transition-colors duration-200">
        {button}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10`}>
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href={item.href || '#'}
                    className={`${
                      active ? 'bg-culinary-light text-culinary-accent' : 'text-gray-700'
                    } block px-4 py-2 text-sm`}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
