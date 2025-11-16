import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NavLink } from "react-router"
import { useState } from "react"
import MakitaSignUp from "@/assets/sign-up-makitaconecta.svg"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import clsx from "clsx"

const API_URL = "http://127.0.0.1:5000";
const signUpFormValidationSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email('Digite um e-mail válido'),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof signUpFormValidationSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [apiError, setApiError] = useState<string | null>(null);

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationSchema),
  })

  async function handleSignUp(data: SignUpFormData){
  setApiError(null); // Limpa erros antigos

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password, 
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Ex: "E-mail já cadastrado"
      setApiError(result.message || "Ocorreu um erro. Tente novamente.");
      return;
    }

    // Sucesso!
    alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");

  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    setApiError("Não foi possível conectar ao servidor. Tente mais tarde.");
  }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(handleSignUp)} className="p-6 md:p-8">
            <FieldGroup>
              {apiError && (
                <FieldDescription className="text-destructive text-sm font-semibold text-center mb-4">
                {apiError}
                </FieldDescription>
              )}
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Digite seu e-mail abaixo para criar sua conta
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    className={clsx(errors.name && "border-destructive ring-destructive")}
                    {...register("name")}
                  />
                  {errors.name && (
                    <FieldDescription className="text-destructive text-xs">
                      {errors.name.message}
                    </FieldDescription>
                  )}
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    className={clsx(errors.email && "border-destructive ring-destructive")}
                    {...register("email")}
                  />
                  {errors.email && (
                    <FieldDescription className="text-destructive text-xs">
                      {errors.email.message}
                    </FieldDescription>
                  )}
                </div>
                <FieldDescription>
                  Seu e-mail será usado apenas para contato. 
                  Não o compartilharemos.
                </FieldDescription>
              </Field>
              <Field>
                <div className="flex flex-col gap-2">
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <Input id="password" type="password" className={clsx(errors.password && "border-destructive ring-destructive")} {...register("password")}/>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirme sua senha
                      </FieldLabel>
                      <Input id="confirm-password" type="password" className={clsx(errors.confirmPassword && "border-destructive ring-destructive")} {...register("confirmPassword")}/>
                    </Field>
                  </Field>
                  {(errors.confirmPassword || errors.password) && (
                    <FieldDescription className="text-destructive text-xs">
                      {errors.confirmPassword?.message}
                    </FieldDescription>
                  )}
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {
                    isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
                      </div>
                    ) : (
                      'Crie sua conta'
                    )
                  }
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Já tem uma conta? <NavLink to="/">Entrar</NavLink>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={MakitaSignUp}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}