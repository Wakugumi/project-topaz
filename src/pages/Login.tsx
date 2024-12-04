import { useState } from 'react'
import { Login } from '../types/Worker'
import Auth from '../services/AuthService.ts'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
	const [Form, setLogin] = useState<Login | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleForm = (e: any) => {
		const { name, value } = e.target;
		setLogin({ ...Form as Login, [name]: value, });
	}

	const handleSubmit = async (e: any) => {
		setIsSubmitting(true);

		e.preventDefault();

		try {
			await Auth.login(Form);
			navigate("/");
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Unknown error at handling login form submission')
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<div className="container">

				<div className="row">

					<div className="col-3"></div>

					<div className="col-6">

						<div className="card card-body">

							<form onSubmit={handleSubmit}>
								{error && <div className="alert alert-danger" role="alert">
									{error}
								</div>}

								<div className="mb-3">
									<label htmlFor="username" className="form-label">Username</label>
									<input className="form-control" name="email" id="username" value={Form?.email} aria-describedby="emailHelp" onChange={handleForm} />
									<div id="emailHelp" className="form-text">Use email address as username.</div>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">Password</label>
									<input type="password" className="form-control" name="password" id="password" value={Form?.password} onChange={handleForm} />
								</div>
								<button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
							</form>

						</div>

					</div>


					<div className="col-3"></div>

				</div >

			</div >
		</>

	);

}
