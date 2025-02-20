import runChat from '@/config/gemini';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// 定义上下文的类型
interface ContextType {
    prevPrompts: string[];
    setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
    onSent: (prompt: string, record?: boolean) => Promise<void>;
    recentPrompt: string;
    setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
    showResult: boolean;
    loading: boolean;
    resultData: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    newChat: () => void;
}

// 创建一个默认值为空对象的上下文
export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index: number, nextWord: string) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, index * 75);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt: string, record: boolean = true) => {
        
        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        if(record) setPrevPrompts(prev => [...prev, prompt]);
        const response = await runChat(prompt);
        const responseArray = response.split("**");
        const newResponse = responseArray.map((e, i) => i === 0 || i % 2 !== 1 ? e : "<b>" + e + "</b>").join('');
        const newResponse2 = newResponse.split('*').join('<br/>');
        const newResponseArray = newResponse2.split(' ');
        newResponseArray.forEach((nextWord, index) => {
            delayPara(index, nextWord + ' ');
        });
        setLoading(false);
        setInput('');

    };

    const contextValue: ContextType = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

// 创建一个钩子来使用上下文
export const useContextValue = () => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useContextValue must be used within a ContextProvider');
    }
    return context;
};

export default ContextProvider;
