import ContentSection from '@/layouts/content-section'
import { UserProfile } from '@clerk/clerk-react'

const Account = () => {
  return (
    <ContentSection
        title="Account"
        subtitle='Manage your account.'
        className='max-w-[900px]'
    >
        <UserProfile />
    </ContentSection>
  )
}

export default Account