import { Section } from "@/components/shared/section/section";
import { SectionLoader } from "@/components/shared/skeleton/section";
import { SectionHeadingWithBackButton } from "@/components/shared/typography/heading";
import ImageSection from "@/features/user/components/mio/image-section";
import ProfileForm from "@/features/user/components/mio/profile-form";
import { getUserProfile } from "@/features/user/libs/user";
import { getUserImage } from "@/features/user/libs/user-image";
import { getAuthUser } from "@/lib/dal";
import { AuthUser } from "@/types/auth-user";
import React, { Suspense } from "react";

export default async function MioProfilePage() {
    const user = await getAuthUser();

    return (
        <>
            <Section>
                <SectionHeadingWithBackButton title="Profile" />

                <div className="flex flex-col gap-6">
                    {/* image section */}
                    <Suspense fallback={<SectionLoader />}>
                        <ImageContainer user={user as AuthUser} />
                    </Suspense>

                    {/* form section */}
                    <Suspense fallback={<SectionLoader />}>
                        <ProfileFormContainer user={user as AuthUser} />
                    </Suspense>
                </div>
            </Section>
        </>
    );
}

const ImageContainer = async ({ user }: { user: AuthUser }) => {
    const res = await getUserImage(user.userId);

    return (
        <ImageSection
            userId={user.userId}
            userFullName={user.name}
            filePath={res.data?.file_path}
        />
    );
};

const ProfileFormContainer = async ({ user }: { user: AuthUser }) => {
    const res = await getUserProfile(user.userId);

    if (!res.data) return <>No data</>;

    return <ProfileForm profile={res.data} />;
};
