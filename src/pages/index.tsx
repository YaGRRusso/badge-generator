import { Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Copy, PaperPlaneRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const createBadgeFormSchema = z.object({
  label: z.string().transform((username) => username.replace(' ', '%20')),
  labelColor: z
    .string()
    .min(7, 'minLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid')
    .transform((data) => data.replace('#', '')),

  desc: z.string().transform((username) => username.replace(' ', '%20')),
  descColor: z
    .string()
    .min(7, 'minLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid')
    .transform((data) => data.replace('#', '')),

  logo: z.string(),
  logoColor: z
    .string()
    .min(7, 'minLength')
    .regex(/^#[0-9A-F]{6}$/i, 'invalid')
    .transform((data) => data.replace('#', '')),
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
    formState: { errors },
  } = useForm<BadgeFormProps>({
    resolver: zodResolver(createBadgeFormSchema),
    defaultValues: {
      style: 'flat-square',
    },
  })

  const onSubmit: SubmitHandler<BadgeFormProps> = (data) => {
    setBadgeJson(data)
  }

  const badgeUrl = useMemo(() => {
    if (badgeJson) {
      const { label, labelColor, desc, descColor, logo, logoColor, style } =
        badgeJson

      return `https://shields.io/badge/${label}-${desc}-${descColor}?logo=${logo}&logoColor=${logoColor}&labelColor=${labelColor}&style=${style}`
    }
  }, [badgeJson])

  return (
    <div className="container-center container">
      <div className="flex flex-col items-center justify-center gap-12">
        {badgeUrl && (
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded border border-slate-800 bg-slate-800 p-1 transition-colors hover:bg-slate-900">
              <Copy />
            </button>
            {/* <Image src={badgeUrl} alt="badge" width={200} height={60} /> */}
            <img src={badgeUrl} alt="badge" className="h-12" />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <div className="flex items-stretch gap-4">
            <Input
              placeholder="Label"
              type="text"
              full
              error={tForm(errors.label?.message as string)}
              {...register('label')}
            />
            <Input
              type="color"
              full={false}
              error={tForm(errors.labelColor?.message as string)}
              className="!w-10 !p-1.5"
              {...register('labelColor')}
            />
          </div>
          <div className="flex items-stretch gap-4">
            <Input
              placeholder="Desc"
              type="text"
              full
              error={tForm(errors.desc?.message as string)}
              {...register('desc')}
            />
            <Input
              type="color"
              error={tForm(errors.descColor?.message as string)}
              className="!w-10 !p-1.5"
              {...register('descColor')}
            />
          </div>
          <div className="flex items-stretch gap-4">
            <Input
              placeholder="Logo"
              type="text"
              full
              error={tForm(errors.logo?.message as string)}
              {...register('logo')}
            />
            <Input
              type="color"
              error={tForm(errors.logoColor?.message as string)}
              className="!w-10 !p-1.5"
              {...register('logoColor')}
            />
          </div>
          <select
            {...register('style')}
            className="rounded bg-slate-800 p-2 text-slate-200"
          >
            <option value="plastic">Plastic</option>
            <option value="flat">Flat</option>
            <option value="flat-square">Flat-Square</option>
            <option value="for-the-badge">For-The-Badge</option>
          </select>
          <button
            className="flex items-center justify-center gap-2 rounded border border-slate-800 bg-slate-800 p-1 px-6 py-4 text-lg text-slate-200 transition-colors hover:bg-slate-900"
            type="submit"
          >
            Criar
            <PaperPlaneRight />
          </button>
        </form>

        {badgeJson && (
          <pre className="scrollbar-hidden max-h-64 w-full max-w-md overflow-auto rounded-md bg-slate-950 p-4 text-xs">
            {JSON.stringify(badgeJson, null, 2)}
          </pre>
        )}
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
