import { AnimalProfile } from "@/components/animal-profile";

export function AnimalProfileTela(){
    return (
        <div className="bg-background flex min-h-svh flex-col p-0">
            <div className="w-full">
                <AnimalProfile />
            </div>
        </div>
    )
}