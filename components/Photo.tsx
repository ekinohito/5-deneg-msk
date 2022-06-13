interface Props {
    picture?: string
}

export default function Photo({picture}: Props) {
    return (
        <object
            className="h-32 w-32 shrink-0 object-cover rounded-full overflow-hidden"
            data={picture}
            type="image/png"
        >
            <img
                src="/default.jpg"
                alt="Stack Overflow logo and icons and such"
            />
        </object>
    )
}
