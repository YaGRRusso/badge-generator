import { Input } from '@/components'
import { mask } from '@/helpers/mask'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const createBadgeFormSchema = z.object({
  label: z.string().transform((username) => username.replace(' ', '%20')),
  labelColor: z
    .string()
    .min(7, 'minLength')
    .max(7, 'maxLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid'),

  desc: z.string().transform((username) => username.replace(' ', '%20')),
  descColor: z
    .string()
    .min(7, 'minLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid'),

  logo: z.string(),
  logoColor: z
    .string()
    .min(7, 'minLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid'),
  style: z.string(),
})

type BadgeFormProps = z.infer<typeof createBadgeFormSchema>

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')
  const { t: tForm } = useTranslation('form')
  const [badgeJson, setBadgeJson] = useState<BadgeFormProps>()

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<BadgeFormProps>({
    resolver: zodResolver(createBadgeFormSchema),
  })

  const onSubmit: SubmitHandler<BadgeFormProps> = (data) => {
    setBadgeJson(data)
  }

  const badgeUrl = useMemo(() => {
    if (badgeJson) {
      const { label, labelColor, desc, descColor, logo, logoColor, style } =
        badgeJson

      return `${label}-${desc}-${descColor}?logo-${logo}&logoColor=${logoColor}&labelColor-${labelColor}&style=${style}`
    }
  }, [badgeJson])

  return (
    <div className="container-center container">
      <div className="flex flex-col items-center justify-center gap-6">
        {badgeUrl && <h1>{badgeUrl}</h1>}
        <div className="flex flex-wrap items-center gap-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              placeholder="label"
              type="text"
              error={tForm(errors.label?.message as string)}
              {...register('label')}
            />
            <Input
              placeholder="labelColor"
              type="text"
              error={tForm(errors.labelColor?.message as string)}
              value={mask(watch('labelColor'), '#******')}
              maxLength={7}
              {...register('labelColor')}
            />

            <Input
              placeholder="desc"
              type="text"
              error={tForm(errors.desc?.message as string)}
              {...register('desc')}
            />
            <Input
              placeholder="descColor"
              type="text"
              error={tForm(errors.descColor?.message as string)}
              value={mask(watch('descColor'), '#******')}
              maxLength={7}
              {...register('descColor')}
            />

            <Input
              placeholder="logo"
              type="text"
              error={tForm(errors.logo?.message as string)}
              {...register('logo')}
            />
            <Input
              placeholder="logoColor"
              type="text"
              error={tForm(errors.logoColor?.message as string)}
              value={mask(watch('logoColor'), '#******')}
              maxLength={7}
              {...register('logoColor')}
            />
            <Input
              placeholder="style"
              type="text"
              error={tForm(errors.style?.message as string)}
              {...register('style')}
            />
            <pre>{JSON.stringify(badgeJson, null, 2)}</pre>
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'form'])),
    },
  }
}
