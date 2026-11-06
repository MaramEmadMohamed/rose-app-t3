"use client";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProfileSchema, ProfileValues } from "../register.schema";
import { useRegister } from "../register-context";

export function ProfileStep() {
  const t = useTranslations("register");
  const { profile, update } = useRegister();
  const schema = useMemo(() => createProfileSchema(t), [t]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: profile ?? {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      gender: undefined,
    },
  });

  const onSubmit = (values: ProfileValues) =>
    update({ profile: values, step: "password" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <h2 className="text-lg font-semibold">{t("createAccount")}</h2>
        <p className="text-sm">{t("profile.subtitle")}</p>
        <p className="text-muted-foreground text-xs">{t("profile.hint")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t("profile.firstName")}</Label>
          <Input
            id="firstName"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-destructive text-xs">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t("profile.lastName")}</Label>
          <Input
            id="lastName"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-destructive text-xs">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">{t("profile.username")}</Label>
        <Input
          id="username"
          autoComplete="username"
          aria-invalid={!!errors.username}
          {...register("username")}
        />
        {errors.username && (
          <p className="text-destructive text-xs">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("profile.phone")}</Label>
        <div dir="ltr">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                id="phone"
                type="tel"
                placeholder="1012345678"
                countryLabel={t("profile.countryLabel")}
                searchCountryLabel={t("profile.searchCountryLabel")}
                noCountryLabel={t("profile.noCountryLabel")}
                value={field.value}
                onChange={field.onChange}
                aria-invalid={!!errors.phone}
              />
            )}
          />
        </div>
        {errors.phone && (
          <p className="text-destructive text-xs">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">{t("profile.gender")}</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="gender" aria-invalid={!!errors.gender}>
                <SelectValue placeholder={t("profile.genderPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t("profile.male")}</SelectItem>
                <SelectItem value="female">{t("profile.female")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-destructive text-xs">{errors.gender.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {t("next")} →
      </Button>
    </form>
  );
}