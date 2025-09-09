"use client";
import { login } from "@/actions";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import { isPhoneNumberValid } from "@persian-tools/persian-tools";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const onPhoneNumberBlur = () => {
    if (phoneNumber && !isPhoneNumberValid(phoneNumber))
      setErrorMessage("شماره تلفن وارد شده معتبر نیست.");
    else setErrorMessage(null);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate an API call
      const user = await login();
      localStorage.setItem("dm-user", JSON.stringify(user));
      toast.success("ورود موفقیت آمیز بود.");
      router.push("/dashboard");
    } catch {
      toast.error("خطایی در ورود رخ داد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ورود</CardTitle>
        <CardDescription>
          برای ورود به حساب کاربری خود، لطفاً اطلاعات زیر را وارد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="phone-number">شماره تلفن</Label>
          <Input
            id="phone-number"
            type="tel"
            placeholder="09xxxxxxxxx"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            onBlur={onPhoneNumberBlur}
            aria-invalid={!!errorMessage}
          />
          <p className="text-sm leading-2 text-red-500">{errorMessage}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          fullWidth
          onClick={handleLogin}
          disabled={!!errorMessage || isLoading || !phoneNumber}
        >
          ورود
        </Button>
      </CardFooter>
    </Card>
  );
};

export { LoginForm };
