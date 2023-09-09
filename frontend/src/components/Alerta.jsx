
export default function Alerta({ alerta }) {
    return (
        <div className={`${alerta.error ? "from-red-400 to-red-500" : "from-indigo-400 to-indigo-500"} bg-gradient-to-br text-center p-3 rounded-sm uppercase text-white font-bold`} >
            {alerta.msg}
        </div>
    )
}

