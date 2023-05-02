import { Input } from '@/components'
import { getUser } from '@/services/github'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { CircleNotch, X } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { z } from 'zod'

const createUserFormSchema = z.object({
  username: z
    .string()
    .min(3, 'minLength')
    .transform((username) => username.trim().replace(/\s/g, '')),
})

type UserFormProps = z.infer<typeof createUserFormSchema>

const HomePage: NextPage = ({}) => {
  const { t } = useTranslation('common')
  const { t: tForm } = useTranslation('form')
  const [search, setSearch] = useState('')

  const {
    handleSubmit,
    register,
    // watch,
    formState: { errors },
  } = useForm<UserFormProps>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      username: 'YaGRRusso',
    },
  })

  const { data: githubUser, isLoading: isGithubUserLoading } = useQuery(
    ['user', search],
    () => {
      if (search) return getUser(search)
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 60000,
    }
  )

  const onSubmit: SubmitHandler<UserFormProps> = ({ username }) => {
    setSearch(username)
    console.log(username)
  }

  return (
    <div className="container-center container">
      <div className="flex flex-col items-center justify-center gap-6">
        {githubUser?.avatar_url && (
          <Link href={githubUser.html_url} target="_blank">
            <Image
              alt="user"
              src={githubUser.avatar_url}
              width={128}
              height={128}
              className="rounded-xl border border-gray-500 transition-all hover:border-gray-400 active:scale-95"
            />
          </Link>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="flex-1 text-3xl">
            {t('hello', { name: githubUser?.name })}
          </h1>

          {!githubUser?.name && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Username"
                type="text"
                error={tForm(errors.username?.message as string)}
                // value={mask(watch('username'), [
                //   '000.000.000-00',
                //   '000.000.000/0000-00',
                // ])}
                {...register('username')}
              />
            </form>
          )}

          {isGithubUserLoading && <CircleNotch className="animate-spin" />}
          {githubUser?.name && githubUser?.html_url && (
            <button
              className="text-gray-500 transition-colors hover:text-gray-400"
              onClick={() => setSearch('')}
            >
              <X />
            </button>
          )}
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
