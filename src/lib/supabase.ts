import { createClient } from '@supabase/supabase-js'

// Check if environment variables are properly set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Enhanced logging for debugging
console.log('=== Supabase Client Initialization ===')
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'NOT SET')
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET (' + supabaseAnonKey.length + ' chars)' : 'NOT SET')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are missing!')
  console.error('Please check your .env.local file contains:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...')
    const { data, error } = await supabase.from('products').select('count').limit(1)
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return { success: false, error }
    } else {
      console.log('✅ Supabase connection successful')
      return { success: true, data }
    }
  } catch (err) {
    console.error('❌ Unexpected error during Supabase test:', err)
    return { success: false, error: err }
  }
}
