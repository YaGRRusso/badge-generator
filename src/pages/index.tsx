import { Button, Input, Select } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Copy, FloppyDisk, PaperPlaneRight } from 'phosphor-react'
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
  const [badgesList, setBadgesList] = useState<string[]>([])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BadgeFormProps>({
    resolver: zodResolver(createBadgeFormSchema),
    defaultValues: {
      style: 'plastic',
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
            <Button
              size="xs"
              onClick={() => {
                navigator.clipboard.writeText(badgeUrl)
              }}
            >
              <Copy />
            </Button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={badgeUrl} alt="badge" className="h-12" />
            <Button
              size="xs"
              onClick={() => setBadgesList([...badgesList, badgeUrl])}
            >
              <FloppyDisk />
            </Button>
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
              error={tForm(errors.label?.message as string)}
              full
              {...register('label')}
            />
            <Input
              type="color"
              error={tForm(errors.labelColor?.message as string)}
              className="!w-10 !p-1.5"
              {...register('labelColor')}
            />
          </div>
          <div className="flex items-stretch gap-4">
            <Input
              placeholder="Desc"
              type="text"
              error={tForm(errors.desc?.message as string)}
              full
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
              error={tForm(errors.logo?.message as string)}
              full
              {...register('logo')}
            />
            <Input
              type="color"
              error={tForm(errors.logoColor?.message as string)}
              className="!w-10 !p-1.5"
              {...register('logoColor')}
            />
          </div>
          <Select
            {...register('style')}
            options={[
              { label: 'Plastic', value: 'plastic' },
              { label: 'Flat', value: 'flat' },
              { label: 'Flat Square', value: 'flat-square' },
              { label: 'For the Badge', value: 'for-the-badge' },
            ]}
          />
          <Button>
            {t('create')}
            <PaperPlaneRight />
          </Button>
        </form>

        {/* {badgeJson && (
          <pre className="scrollbar-hidden max-h-64 w-full max-w-md overflow-auto rounded-md bg-gray-300 p-4 text-xs dark:bg-slate-950">
            {badgeUrl}
            <br />
            <br />
            {JSON.stringify(badgeJson, null, 2)}
          </pre>
        )} */}

        {badgesList.length > 0 && (
          <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
            {badgesList.map((item, index) => (
              <Button
                key={index}
                size="xs"
                variant="light"
                onClick={() => {
                  navigator.clipboard.writeText(item)
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item} alt="badge" />
              </Button>
            ))}
          </div>
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
