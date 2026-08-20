import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({ children }: LayoutProps<"/">) {
      return (
            <div>
                  <Navbar />
                  {children}
            </div>
      )
}
