export default function Today() {
    const today = new Date();
    const f = new Intl.DateTimeFormat("ko-kr", {
        dateStyle: "full"
    })

    return (
        <>
            <div>{f.format(today)}</div>
            <style jsx>{`
                div {
                    margin-top: -5px;
                    margin-bottom: 10px;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 12px;
                }
            `}</style>
        </>
    );
}