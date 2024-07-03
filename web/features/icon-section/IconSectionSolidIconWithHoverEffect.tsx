import IconBlock from 'features/icon-section/IconBlock'
import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  Settings2Icon,
  TabletSmartphoneIcon
} from 'lucide-react'

export default function IconSectionSolidIconWithHoverEffect() {
  return (
    <div className="container px-0 py-24">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
        <IconBlock
          icon={
            <TabletSmartphoneIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
          }
          title="Responsive"
          description={
            'Responsive, and mobile-first project on the web Responsive, and mobile-first project on the web'
          }
        />
        <IconBlock
          icon={
            <Settings2Icon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
          }
          title="Customizable"
          description="Components are easily customized and extendable"
        />
        <IconBlock
          icon={
            <BookOpenIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
          }
          title="Documentation"
          description="Every component and plugin is well documented"
        />
        <IconBlock
          icon={
            <MessagesSquareIcon className="flex-shrink-0 w-6 h-6 text-primary-foreground" />
          }
          title="24/7 Support"
          description="Contact us 24 hours a day, 7 days a week"
        />
      </div>
    </div>
  )
}
