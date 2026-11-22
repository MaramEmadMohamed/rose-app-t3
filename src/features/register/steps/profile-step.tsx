"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
import { StepHeader } from "../steps/step-header";
import { HelpFooter } from "../help-footer";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <StepHeader title={t("createAccount")} subtitle={t("profile.subtitle")}>
        {t("profile.hint")}
      </StepHeader>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-normal">
            {t("profile.firstName")}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder={t("profile.firstNamePlaceholder")}
            aria-invalid={!!errors.firstName}
            className="h-11 rounded-xl px-4"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-destructive text-xs">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-normal">
            {t("profile.lastName")}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder={t("profile.lastNamePlaceholder")}
            aria-invalid={!!errors.lastName}
            className="h-11 rounded-xl px-4"
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
        <Label htmlFor="username" className="text-sm font-normal">
          {t("profile.username")}
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id="username"
          autoComplete="username"
          placeholder={t("profile.usernamePlaceholder")}
          aria-invalid={!!errors.username}
          className="h-11 rounded-xl px-4"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-destructive text-xs">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-normal">
          {t("profile.phone")}
        </Label>
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
                className="h-11 rounded-xl px-4"
              />
            )}
          />
        </div>
        {errors.phone && (
          <p className="text-destructive text-xs">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-normal">
          {t("profile.gender")}
        </Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select
              value={field.value ?? null}
              onValueChange={(value) => field.onChange(value)}
            >
              {" "}
              <SelectTrigger
                id="gender"
                aria-invalid={!!errors.gender}
                className="h-11 w-full cursor-pointer rounded-xl px-5 py-5"
              >
                <SelectValue placeholder={t("profile.genderPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">{t("profile.male")}</SelectItem>
                <SelectItem value="FEMALE">{t("profile.female")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-destructive text-xs">{errors.gender.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="h-10.25 w-full gap-2.5 rounded-xl bg-(--maroon-600) px-4 py-3.5 font-medium"
      >
        {t("next")}
        <ArrowRight className="size-4 rtl:rotate-180" />
      </Button>

      <HelpFooter />
    </form>
  );
}
