const Loading = (props: {text:string, className?: string | undefined}) => {
    return <div className={'flex flex-row rounded-lg ' + props.className}>
        <div
            className="w-5 h-5 text-white border-2 border-t-transparent rounded-full mt-1 p-2 animate-spin"
        >
        </div>
        <span className='pt-1 pl-2 text-xs'>{props.text}</span>
    </div>
}

export default Loading;