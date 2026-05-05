import { supabaseServerAdmin as supabaseServer } from "@/lib/supabase/serverAdmin";

export async function setUserRole(userId: string): Promise<{ success: boolean; message: string }> {
    const role = 'user';

    let userData;
    try {
        const result = await supabaseServer.auth.admin.getUserById(userId);
        userData = result.data;
    } catch (err: unknown) {
        const error = err as Error;
        console.error('getUserById threw:', error.message);
        throw new Error(`Failed to fetch user: ${error.message}`);
    }

    if (!userData?.user) {
        throw new Error('User not found - may need to confirm email first');
    }

    const meta = userData.user.app_metadata || {};

    const newMeta = {
        ...meta,
        role,
        is_active: true,
    };

    let updateResult;
    try {
        updateResult = await supabaseServer.auth.admin.updateUserById(userId, {
            app_metadata: newMeta,
        });
    } catch (err: unknown) {
        const error = err as Error;
        console.error('updateUserById threw:', error.message);
        throw new Error(`Failed to update user: ${error.message}`);
    }

    const { error: updateError } = updateResult;

    if (updateError) {
        throw new Error(updateError.message);
    }

    // Update profile with email into public.profiles
    const userEmail = userData.user.email;
    if (userEmail) {
        const { error: profileError } = await supabaseServer
            .from('profiles')
            .update({
                email: userEmail,
            })
            .eq('id', userId);

        if (profileError) {
            console.error('Failed to update profile:', profileError);
        }
    }

    return { success: true, message: 'Role updated' };
}
