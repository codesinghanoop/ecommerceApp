import React, { createContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';

export const LanguageDirectionContext = createContext({
  direction: 'ltr',
  toggleDirection: () => {}
})

interface LanguageDirectionProviderProp {
    children: React.ReactNode
}

export default function LanguageDirectionProvider(props: LanguageDirectionProviderProp) {
  const [direction, setDirection] = useState('ltr')
  const toggleDirection = () => {
    setDirection(direction === 'ltr' ? 'rtl' : 'ltr')
  }

  useEffect(() => {
    console.log('the direction is',direction);
    if(direction === 'rtl') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  }, [direction])
  console.log('the direction result is---------',direction);
  return (
        <LanguageDirectionContext.Provider value={{
          direction,
          toggleDirection
        }}>
            {props.children}
        </LanguageDirectionContext.Provider>
    );
}
