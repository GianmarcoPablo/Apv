import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./Layout/AuthLayout"
import { Login, ConfirmarCuenta, OlvidePassword, Registrar, NuevoPassword, AdministrarPacientes } from "./pages/index"
import AuthProvider from "./context/AuthProvider"
import RutaProtegida from "./Layout/RutaProtegida"
import { PacienteProvider } from "./context/PacienteProvider"

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<PacienteProvider>
					<Routes>
						<Route path="/" element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path="/registrar" element={<Registrar />} />
							<Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
							<Route path="/olvide-password" element={<OlvidePassword />} />
							<Route path="/olvide-password/:token" element={<NuevoPassword />} />
						</Route>

						<Route path="/admin" element={<RutaProtegida />}>
							<Route index element={<AdministrarPacientes />} />
						</Route>
					</Routes>
				</PacienteProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}
