import { useState } from 'react'
import './Sidebar.css'
import { assets } from '@/assets/assets'
import { useContextValue } from '@/context/Context'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContextValue()

    const loadPrompt = async (prompt: string) => {
        setRecentPrompt(prompt)
        await onSent(prompt, false)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended && (<p>New Chat</p>)}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((prompt, index) => (
                            <div onClick={() => loadPrompt(prompt)} key={index} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.slice(0, 18)} ...</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended && (<p>Help</p>)}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended && (<p>Activity</p>)}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended && (<p>Settings</p>)}
                </div>
            </div>
        </div>
    )
}

export default Sidebar